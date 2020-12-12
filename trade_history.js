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
const user;
const pw;
const svr;
const db;
const port;
if(process.env.ENV==='DEV'){
    user = process.env.DB_USER;
    pw = process.env.DB_PASSWORD;
    svr = process.env.DB_SERVER;
    db = process.env.DB_NAME;
    port = process.env.PORT;
}else{
    user = process.env.DB_USER;
    pw = process.env.DB_PASSWORD;
    svr = process.env.DB_SERVER;
    db = process.env.DB_NAME;
    port = process.env.PORT;
}


const historicalTradeDataModel = mongoose.model('historical_trade_data', new mongoose.Schema({symbol: String, price: Number, amount: Number, date: Date}));
const positionDataModel = mongoose.model('position', new mongoose.Schema({symbol: String, avgPrice: Number, amount: Number}));


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
    var docs = await historicalTradeDataModel.findByIdAndUpdate(req.params.id, {symbol: req.body.symbol, price: req.body.price, amount: req.body.amount, date: req.body.date})
    .then(console.log('update success'))
    res.json(docs)
})

// ======== Delete ========
app.delete('/api/stocks/:id', async (req, res)=> {
    console.log(req.params.id)
    await historicalTradeDataModel.findByIdAndRemove(req.params.id)
    .then(console.log('delete success'))
    res.send(`delete trade id = ${req.params.id}`)
  });
  


const app_port = 3000;
app.listen(app_port, ()=>{
    console.log(`listening port ${app_port}`);
})

async function main(){
    
    const openUrl = `mongodb://${user}:${pw}@${svr}:${port}/${db}`;
    //const openUrl = 'mongodb://jo1ce:Alan0114@localhost:27018/trade';  local_testing
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