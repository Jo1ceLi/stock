var mongoose = require('mongoose');
var connection = require("../share/connection");

const Connection = new connection()
Connection.connect();

const cashSchema = new mongoose.Schema(
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

var cashDataModel = mongoose.model('cash_data', cashSchema);


cashDataModel.insertMany({currency: 'USD', amount: 4636.45, modifyDate: '2021-01-03'})