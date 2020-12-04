var yf = require('yahoo-finance')
var mongoose = require('mongoose')

// yf.historical({
//     symbol: 'AAPL',
//     from: '2020-12-01',
//     to: '2020-12-02'
// }, function(err, quote){
//     if(err){
//         console.log()
//     }
//     console.log(quote)
// })

mongoose.connect('mongodb://jo1ce:Alan0114@localhost:27018/trade', {useUnifiedTopology: true, useNewUrlParser: true });
const stock_history_data_model = mongoose.model('stock_history_data', new mongoose.Schema({symbol: String, closePrice: Number, Date: Date}));

symbols = ['AAPL', 'TSLA', 'PLTR',
           'NIO', 'AMZN', 'ARKK',
           'ARKW', 'ATVI', 'BABA',
           'DIS', 'FB', 'FSLY', 'GOOG',
           'IPOB', 'MSFT', 'NFLX', 'U',
           'DOYU', 'TAN', 'HUYA', 'RH',
           'TSM']

// async function insertTodayStockData(){
    
// }

var quoteAndWriteDB = async function() {
    for(let symbol of symbols)
    {
        await yf.quote(
            {
                symbol: symbol,
                modules: ['price']
            })
        .then(async res=>{
            await stock_history_data_model.find({symbol: symbol, Date:res.price.regularMarketTime} 
            ).then(async resolve=>{
                //console.log(resolve)
                if(resolve.length==0){
                   await stock_history_data_model.insertMany({symbol: symbol, closePrice: res.price.regularMarketPreviousClose, Date: res.price.regularMarketTime})
                }else{
                    console.log('Data already exist')
                }
            })       
        }, rej=>{
            console.log(rej)


        })
        console.log('finished quote',symbol)
    }
}

const main = async() =>{
    await quoteAndWriteDB();
    console.log('Finish write DB')
    console.log("closed connection")
    mongoose.connection.close();
}

main()

// yf.quote({
//     symbol: 'AAPL',
//     modules: ['price']
// },function(err, quote){
//     if(err){
//         console.log(err)
//     }
//     console.log(quote.price.regularMarketPreviousClose)
//     console.log('finish quote')
// })