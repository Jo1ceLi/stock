var mongoose = require('mongoose')
mongoose.connect('mongodb://jo1ce:Alan0114@localhost:27018/trade', {useUnifiedTopology: true, useNewUrlParser: true });


const historicalPositionDataModel = mongoose.model('historical_position_data', new mongoose.Schema
({symbol: String, amount: Number, date: Date}));

async function main(){

    await historicalPositionDataModel.insertMany({symbol: 'PLTR', amount: 5, date: new Date('2020-12-03')});
    //console.log(result)
    mongoose.connection.close()
}
main();