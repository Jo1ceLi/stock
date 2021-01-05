var mongoose = require('mongoose')
var connection = require("./share/connection")
var positionModel = require('./models/Position')

const Connection = new connection()
Connection.connect();

var Position = positionModel.PositionModel;

init_positions = [{symbol: 'AAPL', cost: 111.587, amount: 25.04},
                  {symbol: 'ACTC', cost: 11.50,   amount: 30},
                  {symbol: 'AMZN', cost: 3233.00, amount: 1},
                  {symbol: 'ARKG', cost: 100.459, amount: 5.01},
                  {symbol: 'ARKK', cost: 104.113, amount: 10.075},
                  {symbol: 'ARKW', cost: 118.999, amount: 1.009},
                  {symbol: 'ATVI', cost: 80.00,   amount: 3},
                  {symbol: 'BABA', cost: 251.133, amount: 3},
                  {symbol: 'BB',   cost: 6.94,    amount: 15},
                  {symbol: 'DIS',  cost: 119.70,  amount: 1},
                  {symbol: 'FB',   cost: 227.729, amount: 7},
                  {symbol: 'FSLY', cost: 83.00,   amount: 1},
                  {symbol: 'GOOG', cost: 1458.00, amount: 1},
                  {symbol: 'NFLX', cost: 490.00,  amount: 1},
                  {symbol: 'NIO',  cost: 45.20,   amount: 15},
                  {symbol: 'NVDA', cost: 519.86,  amount: 1},
                  {symbol: 'PLTR', cost: 23.554,  amount: 50},
                  {symbol: 'RH',   cost: 292.333, amount: 3},
                  {symbol: 'SPLK', cost: 173,     amount: 1},
                  {symbol: 'SV',   cost: 10.45,   amount: 10},
                  {symbol: 'TAN',  cost: 70.819,  amount: 3.002},
                  {symbol: 'THBR', cost: 12.75,   amount: 30},
                  {symbol: 'TSLA', cost: 345.72,  amount:  8},
                  {symbol: 'TSM',  cost: 74.944,  amount: 23.105},
                  {symbol: 'U',    cost: 90,      amount: 1},
                  {symbol: 'UBER', cost: 50.5,    amount: 10},
                  {symbol: 'VGAC', cost: 11.96,   amount: 10},
                  {symbol: 'ZM',   cost: 383,     amount: 2}
                ]
async function main(){
    await Position.deleteMany({});
    await Position.insertMany(init_positions);
    
    mongoose.connection.close()
}
main();