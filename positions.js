var mongoose = require('mongoose')
mongoose.connect('mongodb://jo1ce:Alan0114@localhost:27018/trade', {useUnifiedTopology: true, useNewUrlParser: true });


const position_model = mongoose.model('position', new mongoose.Schema({symbol: String, avgPrice: Number, amount: Number}));

init_positions = [{symbol: 'AAPL', avgPrice: 85.65, amount: 23.04},
                  {symbol: 'AMZN', avgPrice: 3233.00, amount: 1},
                  {symbol: 'ARKK', avgPrice: 91.27, amount: 6},
                  {symbol: 'ARKW', avgPrice: 118.75, amount: 1},
                  {symbol: 'ATVI', avgPrice: 80.00, amount: 3},
                  {symbol: 'BABA', avgPrice: 261.75, amount: 2},
                  {symbol: 'DIS', avgPrice: 119.70, amount: 1},
                  {symbol: 'DOYU', avgPrice: 13.20, amount: 10},
                  {symbol: 'FB', avgPrice: 221.18, amount: 6},
                  {symbol: 'FSLY', avgPrice: 83.00, amount: 1},
                  {symbol: 'GOOG', avgPrice: 1458.00, amount: 1},
                  {symbol: 'HUYA', avgPrice: 23.20, amount: 10},
                  {symbol: 'IPOB', avgPrice: 18.80, amount: 5},
                  {symbol: 'MSFT', avgPrice: 206.04, amount: 7.02},
                  {symbol: 'NFLX', avgPrice: 490.00, amount: 1},
                  {symbol: 'NIO', avgPrice: 42.5, amount: 100},
                  {symbol: 'PLTR', avgPrice: 23.30, amount: 34},
                  {symbol: 'RH', avgPrice: 292.33, amount: 3},
                  {symbol: 'TAN', avgPrice: 70.80, amount: 3},
                  {symbol: 'TSLA', avgPrice: 309.92, amount: 7},
                  {symbol: 'TSM', avgPrice: 74.94, amount: 23.105},
                  {symbol: 'U', avgPrice: 90, amount: 1}]
async function main(){

    await position_model.insertMany(init_positions)
    //console.log(result)
    mongoose.connection.close()
}
main();