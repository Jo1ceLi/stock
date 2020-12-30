var mongoose = require('mongoose');
var connection = require("../share/connection");

const Connection = new connection()
Connection.connect();

const historicalStockDataSchema = new mongoose.Schema(
    {
        symbol:{
            type: String,
            required: true
        },
        closingprice:{
            type: Number,
            required: true
        },
        date:{
            type: Date,
            required: true
        }
    }
)

exports.HistoricalStockDataModel = mongoose.model('historical_stock_data', historicalStockDataSchema);


