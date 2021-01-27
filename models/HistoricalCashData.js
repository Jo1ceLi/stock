var mongoose = require('mongoose');

const historicalCashSchema = new mongoose.Schema(
    {
        currency:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        date:{
            type: Date,
            required: true
        }
        
    }
)

var historicalCashDataModel = mongoose.model('HistoricalCashData', historicalCashSchema);
module.exports = historicalCashDataModel;