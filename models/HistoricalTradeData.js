var mongoose = require('mongoose');
const historicalTradeDataSchema = new mongoose.Schema(
    {
        symbol:{
            type: String,
            required: true
        },
        price:{
            type: Number,
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

exports.HistoricalTradeDataModel = mongoose.model('historical_trade_data', historicalTradeDataSchema);

async function main(){
    await Position.insertMany(positionDatas)
    .then(value=>{
        console.log(value);
    });
    mongoose.connection.close();
}


