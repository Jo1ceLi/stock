const router = require('express').Router();

var positionModel = require('../models/Position');
var historicalTradeDataModel = require('../models/HistoricalTradeData');
var historicalPositionModel = require('../models/HistoricalPosition');
var hisotryStockDataModel = require('../models/HistoryStockData')
var historicalCashDataModel = require('../models/HistoricalCashData');
var cashDataModel = require('../models/cashData');
const { model } = require('mongoose');

var Position = positionModel.PositionModel;
var Cash = cashDataModel.CashDataModel;
var HistoryStockData = hisotryStockDataModel.HistoricalStockDataModel;
var HistoricalPositionModel = historicalPositionModel.HistoricalPositionModel;

router.get('/api/positions', async (req, res)=>{
    var docs = await Position.find()
    .sort([['symbol', 1]])
    .then()
    res.json(docs)
})

router.get('/api/positions/period', async (req, res)=>{
    var from = new Date(req.query.from);
    var to = new Date(req.query.to);
    Date(to.setDate(to.getDate()+1));
    var result = await HistoricalPositionModel.find({date: {$gte: from, $lt: to}})
    .sort([['symbol', 1]])
    .exec();
    res.json(result);

})

router.get('/api/positions/:date', async (req, res) => {
    var date = new Date(req.params.date);
    var nextday = new Date(req.params.date);
    Date(nextday.setDate(nextday.getDate()+1))
    var result = await HistoricalPositionModel.find(
        { date: {$gte: date, $lt: nextday }}
    )
    .sort([['symbol', 1]])
    .exec()
    res.json(result);
})

router.post('/api/cash/dw', async(req, res)=>{
    Cash.find({currency: req.query.currency},(err, response)=>{
        if(err){
            res.send(err);
        }else{
            oriAmount = response[0].amount;
            Cash.updateOne({currency: req.query.currency},
                {amount: oriAmount + req.body.amount}, 
                (err, raw)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.send('Update cash successful');
                    }
                });
        }
    })

})

router.get('/api/cash', async (req, res)=>{
    var docs = await Cash.find()
    .then();
    res.json(docs);
})

router.get('/api/cash/period', async(req, res)=>{
    var from = new Date(req.query.from);
    var to = new Date(req.query.to);
    Date(to.setDate(to.getDate()+1));
    var result = await historicalCashDataModel.find({date: {$gte: from, $lt: to}})
    .sort([['symbol', 1]])
    .exec();
    res.json(result);
})

router.get('/api/closingprice/:date', async(req, res)=>{
    var date = new Date(req.params.date);
    var nextday = new Date(req.params.date);
    console.log(date);
    console.log(Date(nextday.setDate(nextday.getDate()+1)));
    var lastClosingPrice = await HistoryStockData.find({date: {$gte: date, $lt: nextday }})
    .sort([['symbol', 1]])
    .exec();
    res.json(lastClosingPrice);
})

router.get('/api/stock/period', async(req, res)=>{
    var from = new Date(req.query.from);
    var to = new Date(req.query.to);
    Date(to.setDate(to.getDate()+1));
    var result = await HistoryStockData.find({date: {$gte: from, $lt: to}})
    .sort([['symbol', 1]])
    .exec();
    res.json(result);
})

router.get('/api/close-price-of-2020', async(req, res)=>{
    today = new Date()
    today.setDate(today.getDate()-1);
    var lastClosingPrice = await HistoryStockData.find({date: new Date('2020-12-31')})
    .exec();
    var positions = await Position.find()
    .exec();
    res.json(lastClosingPrice);
})

module.exports = router