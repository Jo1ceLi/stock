var mongoose = require('mongoose')
var connection = require("./share/connection")
var positionModel = require('./models/Position')

const Connection = new connection()
Connection.connect();

var Position = positionModel.PositionModel;

init_positions = [{symbol: 'AAPL', cost: 85.65, amount: 23.04},
                  {symbol: 'AMZN', cost: 3233.00, amount: 1},
                  {symbol: 'ARKK', cost: 91.27, amount: 6},
                  {symbol: 'ARKW', cost: 118.75, amount: 1},
                  {symbol: 'ATVI', cost: 80.00, amount: 3},
                  {symbol: 'BABA', cost: 261.75, amount: 2},
                  {symbol: 'DIS', cost: 119.70, amount: 1},
                  {symbol: 'DOYU', cost: 12.675, amount: 40},
                  {symbol: 'FB', cost: 221.18, amount: 6},
                  {symbol: 'FSLY', cost: 83.00, amount: 1},
                  {symbol: 'GOOG', cost: 1458.00, amount: 1},
                  {symbol: 'HUYA', cost: 23.20, amount: 10},
                  {symbol: 'OPEN', cost: 18.80, amount: 5},
                  {symbol: 'NFLX', cost: 490.00, amount: 1},
                  {symbol: 'PLTR', cost: 23.36, amount: 35},
                  {symbol: 'RH', cost: 292.33, amount: 3},
                  {symbol: 'TAN', cost: 70.80, amount: 3},
                  {symbol: 'TSLA', cost: 309.92, amount: 7},
                  {symbol: 'TSM', cost: 74.94, amount: 23.105},
                  {symbol: 'U', cost: 90, amount: 1},
                  {symbol: 'UBER', cost: 50.5, amount: 10},
                  {symbol: 'VGAC', cost: 11.96, amount: 10}
                ]
async function main(){

    await Position.insertMany(init_positions)
    
    mongoose.connection.close()
}
main();