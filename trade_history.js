var mongoose = require('mongoose')
mongoose.connect('mongodb://jo1ce:Alan0114@localhost:27018/trade', {useUnifiedTopology: true, useNewUrlParser: true });


const historicalTradeDataModel = mongoose.model('historical_trade_data', new mongoose.Schema({symbol: String, price: Number, amount: Number, date: Date}));
//historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});

async function main(){

    await historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});
    //console.log(result)
    mongoose.connection.close()
}
main();