var mongoose = require('mongoose')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var connection = require("./share/connection");

const Connection = new connection()
Connection.connect();

var positionModel = require('./models/Position');
var historicalTradeDataModel = require('./models/HistoricalTradeData')
var cashDataModel = require('./models/Cash');

var app = express()
// use cors
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


var Position = positionModel.PositionModel;
var HistoricalTradeData = historicalTradeDataModel.HistoricalTradeDataModel;


// =====  Read  ======
app.get('/api/trade/:id', async(req, res)=>{
    var docs = await HistoricalTradeData.findById(req.params.id)
    .then(console.log('found one data'))
    res.json(docs)
})

app.get('/api/trade', async (req, res)=>{
    var docs = await HistoricalTradeData.find()
    .then()

    res.json(docs)
})

app.get('/api/positions', async (req, res)=>{
    var docs = await Position.find()
    .then()
    res.json(docs)
})

// ====== Create ======
app.post('/api/trade', async(req, res)=>{
    // const session = await mongoose.startSession();
    // session.startTransaction();
    //     const opts = { session, new: true };
        var trade_insertManyRes = await HistoricalTradeData.insertMany({symbol: req.body.symbol, price: req.body.price, amount: req.body.amount, date: req.body.date})
        
        console.log("tradeInsertManyRes",trade_insertManyRes);
        var doc = await Position.find({symbol: req.body.symbol}).exec()

        if( doc.length != 0 ){
            filter = { symbol: req.body.symbol}
            update = { cost: ((doc[0].amount*doc[0].cost)+(req.body.price*req.body.amount))/(req.body.amount+doc[0].amount),
                       amount: doc[0].amount + req.body.amount }
            await Position.findOneAndUpdate(filter, update).exec()
            console.log('update a existing symbol successful')
        }
        else{
            await Position.insertMany({symbol: req.body.symbol, cost: req.body.price, amount: req.body.amount})
            console.log('insert a new symbol to position')
        }
        res.send('Adding trade data success');
 
})

// ======= Update =======
app.put('/api/trade/:id', async(req, res)=>{
    var trade_doc = await HistoricalTradeData.findByIdAndUpdate(req.params.id,
        {price: req.body.price, amount: req.body.amount})
    .then(console.log('update success'))
    .catch(err=>{
        res.send('Can not find this data in trade data')
    })
    res.json(trade_doc)
    var position_doc = await Position.find({symbol: trade_doc.symbol}).exec()
    if(position_doc.length === 0){
        console.log('Error! Symbol is not in position data!')
    }else{
        new_avgPrice = ((position_doc[0].cost * position_doc[0].amount - trade_doc.price * trade_doc.amount + req.body.price * req.body.amount)
                        /(position_doc[0].amount - trade_doc.amount + req.body.amount))
        new_amount = (position_doc[0].amount - trade_doc.amount + req.body.amount)
       
        await Position.findOneAndUpdate({symbol: trade_doc.symbol}, {cost: new_avgPrice, amount: new_amount}).exec()
    }
})
// 
// ======== Delete ========
app.delete('/api/trade/:id', async (req, res)=> {
    
    var trade_doc = await HistoricalTradeData.findByIdAndRemove(req.params.id)
    .then(console.log('delete success'))
    var position_doc = await Position.find({symbol: trade_doc.symbol}).exec()
    if(position_doc.length === 0){
        console.log('Error! Symbol is not in position data!')
    }else{
        
        new_avgPrice = (( position_doc[0].cost * position_doc[0].amount ) - (trade_doc.price * trade_doc.amount)) / (position_doc[0].amount - trade_doc.amount);
        new_amount = (position_doc[0].amount - trade_doc.amount);
        console.log('new amount = ',new_amount);
        if(new_amount != 0){
            await Position.findOneAndUpdate({symbol: trade_doc.symbol}, {cost: new_avgPrice, amount: new_amount}).exec()
        }else{
            await Position.findOneAndDelete({symbol: trade_doc.symbol}).exec();
        }
    }
    res.send(`delete trade id = ${req.params.id}`)
  });
  
//TODO #10 Implement DB side delete api @Jo1ceLi

const app_port = 8080;
app.listen(app_port, ()=>{
    console.log(`listening port ${app_port}`);
})

// async function main(){
//     const openUrl = `mongodb://${user}:${pw}@${svr}:${port}/${db}`;
//     await mongoose.connect(openUrl, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true}).then(console.log('DB connected!'))
// }
// main();