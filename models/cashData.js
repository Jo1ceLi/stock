var mongoose = require('mongoose');
const cashDataSchema = new mongoose.Schema(
    {
        currency:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        modifyDate:{
            type: Date,
            required: true
        }
    }
)
exports.CashDataModel = mongoose.model(
    'cash_data', cashDataSchema);