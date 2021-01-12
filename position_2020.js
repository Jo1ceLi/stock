var mongoose = require('mongoose')
var connection = require("./share/connection")
var yf = require('yahoo-finance')

var hisotryStockDataModel = require('./models/HistoryStockData')

const Connection = new connection()
Connection.connect();

var HistoryStockData = hisotryStockDataModel.HistoricalStockDataModel;
var positons_2020 = [
    {"symbol":"AAPL","cost":110.032,"amount":23.04},
    {"symbol":"ACTC","cost":11.5,"amount":30},
    {"symbol":"AMZN","cost":3233,"amount":1},
    {"symbol":"ARKG","cost":100.459,"amount":5.01},
    {"symbol":"ARKK","cost":104.113,"amount":10.075},
    {"symbol":"ARKW","cost":118.999,"amount":1.009},
    {"symbol":"ATVI","cost":80,"amount":3},
    {"symbol":"BABA","cost":251.133,"amount":3},
    {"symbol":"BB","cost":6.94,"amount":15},
    {"symbol":"DIS","cost":119.7,"amount":1},
    {"symbol":"FB","cost":227.729,"amount":7},
    {"symbol":"FSLY","cost":83,"amount":1},
    {"symbol":"GOOG","cost":1458,"amount":1},
    {"symbol":"NFLX","cost":490,"amount":1},
    {"symbol":"NIO","cost":45.2,"amount":15},
    {"symbol":"NVDA","cost":519.86,"amount":1},
    {"symbol":"PLTR","cost":23.363,"amount":35},
    {"symbol":"RH","cost":292.333,"amount":3},
    {"symbol":"SPLK","cost":173,"amount":1},
    {"symbol":"SV","cost":10.45,"amount":10},
    {"symbol":"TAN","cost":70.819,"amount":3.002},
    {"symbol":"THBR","cost":12.75,"amount":30},
    {"symbol":"TSLA","cost":345.72,"amount":8},
    {"symbol":"TSM","cost":74.944,"amount":23.105},
    {"symbol":"U","cost":90,"amount":1},
    {"symbol":"UBER","cost":50.5,"amount":10},
    {"symbol":"VGAC","cost":11.96,"amount":10},
    {"symbol":"ZM","cost":383,"amount":2}
  ]

var symbols = []
positons_2020.forEach(element=>{
    symbols.push(element.symbol);
});

  var mongoose = require('mongoose');
  const position_2020_Schema = new mongoose.Schema(
      {
          symbol:{
              type: String,
              required: true
          },
          cost:{
              type: Number,
              required: true
          },
          amount:{
              type: Number,
              required: true
          }
      }
  )
  var positionIn2020 = mongoose.model('2020_position', position_2020_Schema);
  module.exports = positionIn2020;
//   var lastClosePrice = [];
//   yf.historical({
//       symbols: symbols,
//       from: '2021-01-01',
//       to: '2021-01-01'
//   }).then(res=>{
//     // console.log(res);
//     symbols.forEach(element=>{
//         // console.log(element,res[element][0].close)
//         HistoryStockData.insertMany({symbol: element, closingprice: res[element][0].close, date: new Date('2020-12-31')}).then(
//             res=>console.log(res)
//         )
//     })
// })


async function quoteAndWriteDB(symbols) {
    for(let symbol of symbols)
    {
        await yf.quote(
            {
                symbol: symbol,
                modules: ['price']
            })
        .then(async res=>{
            await HistoryStockData.find({symbol: symbol, date:res.price.regularMarketTime} 
            ).then(async resolve=>{
                if(resolve.length==0){
                    await HistoryStockData.insertMany({symbol: symbol, closingprice: res.price.regularMarketPreviousClose, date: res.price.regularMarketTime})
                }else{
                    console.log('Data already exist')
                }
            })
            .catch(err=>{
                console.log('Error on writing DB:',symbol)
            })     
        }, rej=>{
            console.log('Error on quote:',symbol)
            console.log(rej)
        })
        console.log('finished quote',symbol)
    }
}
async function main() {
    await quoteAndWriteDB(symbols);
    mongoose.connection.close();

}
// main()