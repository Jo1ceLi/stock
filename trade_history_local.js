var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()
 
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('dotenv').config()
var user;
var pw;
var svr;
var db;
var port;
if(process.env.ENV==="DEV"){
    console.log('Dev environment configuration is preparing')
    user = process.env.DEV_DB_USER;
    pw = process.env.DEV_DB_PASSWORD;
    svr = process.env.DEV_DB_SERVER;
    db = process.env.DEV_DB_NAME;
    port = process.env.DEV_PORT;
}else if(process.env.ENV==="PROD"){
    console.log('Production environment configuration is preparing')
    user = process.env.PROD_DB_USER;
    pw = process.env.PROD_DB_PASSWORD;
    svr = process.env.PROD_DB_SERVER;
    db = process.env.PROD_DB_NAME;
    port = process.env.PROD_PORT;
}else{
    console.log('Can not recognize this enviroment')
}


// console.log(`mongodb://${user}:${pw}@${svr}:${port}/${db}`)


// mongoose.connect(`mongodb://${user}:${pw}@${svr}:${port}/${db}`, {useUnifiedTopology: true, useNewUrlParser: true })
// mongoose.connect(`mongodb://jo1ce:Alan0114@mongodb:27017/trade`, {useUnifiedTopology: true, useNewUrlParser: true })


const historicalTradeDataModel = mongoose.model('historical_trade_data', new mongoose.Schema({symbol: String, price: Number, amount: Number, date: Date}));
const positionDataModel = mongoose.model('position', new mongoose.Schema({symbol: String, avgPrice: Number, amount: Number}));

// historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});

// =====  Read  ======
app.get('/api/stocks/:id', async(req, res)=>{
    var docs = await historicalTradeDataModel.findById(req.params.id)
    .then(console.log('found one data'))
    res.json(docs)
})

app.get('/api/stocks', async (req, res)=>{
    var docs = await historicalTradeDataModel.find()
    .then(console.log('found datas'));
    res.json(docs)
})

// ====== Create ======
app.post('/api/stocks', async(req, res)=>{
    await historicalTradeDataModel.insertMany({symbol: req.body.symbol, price: req.body.price, amount: req.body.amount, date: req.body.date})
    .then(console.log('insert success'))
    console.log(req.body.symbol);
    res.json(req.body.price);
    
    var doc = await positionDataModel.find({symbol: req.body.symbol}).exec()
    // console.log('doc[0]', doc[0])
    // console.log('doc[0].amount', doc[0].amount);
    // position has this symbol
    if( doc.length != 0 ){
        filter = { symbol: req.body.symbol}
        update = { avgPrice: ((doc[0].amount*doc[0].avgPrice)+(req.body.price*req.body.amount))/(req.body.amount+doc[0].amount),
                   amount: doc[0].amount + req.body.amount }
        await positionDataModel.findOneAndUpdate(filter, update).exec()
        console.log('update a existing symbol successful')
    }
    // // new symbol for position
    else{
        await positionDataModel.insertMany({symbol: req.body.symbol, avgPrice: req.body.price, amount: req.body.amount})
        console.log('insert a new symbol to position')
    }
})

// ======= Update =======
app.put('/api/stocks/:id', async(req, res)=>{
    var trade_doc = await historicalTradeDataModel.findByIdAndUpdate(req.params.id,
        {price: req.body.price, amount: req.body.amount})
    .then(console.log('update success'))
    console.log(trade_doc.symbol)
    // console.log(trade_doc)
    res.json(trade_doc)
    var position_doc = await positionDataModel.find({symbol: trade_doc.symbol}).exec()
    if(position_doc.length === 0){
        console.log('Error! Symbol is not in position data!')
    }else{
        var new_avgPrice
        console.log('to update')
        console.log(position_doc)
        new_avgPrice = ((position_doc[0].avgPrice * position_doc[0].amount - trade_doc.price * trade_doc.amount + req.body.price * req.body.amount)
                        /(position_doc[0].amount - trade_doc.amount + req.body.amount))
        new_amount = (position_doc[0].amount - trade_doc.amount + req.body.amount)
        // filter = { symbol: req.body.symbol}
        // update = { avgPrice: ((doc[0].amount*doc[0].avgPrice)+(req.body.price*req.body.amount))/(req.body.amount+doc[0].amount),
        //            amount: doc[0].amount + req.body.amount }
        await positionDataModel.findOneAndUpdate({symbol: trade_doc.symbol}, {avgPrice: new_avgPrice, amount: new_amount}).exec()
    }
})
// 
// ======== Delete ========
app.delete('/api/stocks/:id', async (req, res)=> {
    
    var trade_doc = await historicalTradeDataModel.findByIdAndRemove(req.params.id)
    .then(console.log('delete success'))
    var position_doc = await positionDataModel.find({symbol: trade_doc.symbol}).exec()
    if(position_doc.length === 0){
        console.log('Error! Symbol is not in position data!')
    }else{
        
        new_avgPrice = (( position_doc[0].avgPrice * position_doc[0].amount ) - (trade_doc.price * trade_doc.amount)) / (position_doc[0].amount - trade_doc.amount);
        new_amount = (position_doc[0].amount - trade_doc.amount);
        await positionDataModel.findOneAndUpdate({symbol: trade_doc.symbol}, {avgPrice: new_avgPrice, amount: new_amount}).exec()
    }
    res.send(`delete trade id = ${req.params.id}`)
  });
  
//TODO #10 Implement DB side delete api @Jo1ceLi

const app_port = 3000;
app.listen(app_port, ()=>{
    console.log(`listening port ${app_port}`);
})

async function main(){

    const openUrl = `mongodb://${user}:${pw}@${svr}:${port}/${db}`;
    //const openUrl = "mongodb://jo1ce:Alan0114@localhost:27018/trade";
    await mongoose.connect(openUrl, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }).then(console.log('DB connected!'))

    // await historicalTradeDataModel.find((err, res)=>{
    //     if(err) console.log(err)
    //     else console.log(res)
    // }).catch(err=>{
    //     console.log(err);
    // })



    // await historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});
    //console.log(result)
    //mongoose.connection.close()

}
main();