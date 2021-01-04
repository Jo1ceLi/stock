const router = require('express').Router();

var positionModel = require('../models/Position');
var historicalTradeDataModel = require('../models/HistoricalTradeData');
var cashDataModel = require('../models/cashData');
const { model } = require('mongoose');

var Position = positionModel.PositionModel;
var Cash = cashDataModel.CashDataModel;

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

module.exports = router