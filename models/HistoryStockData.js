var mongoose = require('mongoose');
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