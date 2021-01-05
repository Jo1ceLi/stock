var yf = require('yahoo-finance')
var mongoose = require('mongoose')
var positionModel = require('../models/Position')
var historicalStockDataModel = require('../models/HistoryStockData')

var connection = require("../share/connection")

const Connection = new connection()
Connection.connect();

var Position = positionModel.PositionModel;
var HistoricalStockData = historicalStockDataModel.HistoricalStockDataModel;


async function quotePosition() {
    
    position_symbol = []
    var result = await Position.find();
    result.forEach(element => {
        position_symbol.push(element.symbol);
    });
    return position_symbol
    
}

async function quoteAndWriteDB(symbols) {
    for(let symbol of symbols)
    {
        await yf.quote(
            {
                symbol: symbol,
                modules: ['price']
            })
        .then(async res=>{
            await HistoricalStockData.find({symbol: symbol, date:res.price.regularMarketTime} 
            ).then(async resolve=>{
                if(resolve.length==0){
                   await HistoricalStockData.insertMany({symbol: symbol, closingprice: res.price.regularMarketPreviousClose, date: res.price.regularMarketTime})
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
const main = async() =>{
    var symbols = await quotePosition();
    await quoteAndWriteDB(symbols);
    console.log(symbols)
    mongoose.connection.close();
}

main()
