var mongoose = require('mongoose');

const historicalPositionSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
);

exports.HistoricalPositionModel = mongoose.model('historical_position_data', historicalPositionSchema);