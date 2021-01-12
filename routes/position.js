const router = require('express').Router();

var positionModel = require('../models/Position');
var historicalTradeDataModel = require('../models/HistoricalTradeData');
// var lastDayPositionModel = require('../position_2020');
var hisotryStockDataModel = require('../models/HistoryStockData')
var cashDataModel = require('../models/cashData');
const { model } = require('mongoose');

var Position = positionModel.PositionModel;
var Cash = cashDataModel.CashDataModel;
var HistoryStockData = hisotryStockDataModel.HistoricalStockDataModel;

router.get('/api/positions', async (req, res)=>{
    var docs = await Position.find()
    .then()
    res.json(docs)
})

router.get('/api/cash', async (req, res)=>{
    var docs = await Cash.find()
    .then();
    res.json(docs);
})

router.get('/api/last-closing-price', async(req, res)=>{
    today = new Date()
    today.setDate(today.getDate()-1);
    var lastClosingPrice = await HistoryStockData.find({date: {$gte: today}})
    .exec();
    var positions = await Position.find()
    .exec();

    // positionInfo = lastClosingPrice.concat(positions);
    res.json();
})

router.get('/api/close-price-of-2020', async(req, res)=>{
    today = new Date()
    today.setDate(today.getDate()-1);
    var lastClosingPrice = await HistoryStockData.find({date: new Date('2020-12-31')})
    .exec();
    var positions = await Position.find()
    .exec();

    // positionInfo = lastClosingPrice.concat(positions);
    res.json(lastClosingPrice);
})

// router.get('/api/positions-of-2020', async(req, res)=>{
//     today = new Date()
//     today.setDate(today.getDate()-1);
//     var lastDayPositions = await lastDayPositionModel.find()
//     .exec();


//     // positionInfo = lastClosingPrice.concat(positions);
//     res.json(lastDayPositions);
// })

module.exports = router