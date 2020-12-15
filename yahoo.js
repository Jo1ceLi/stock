var yf = require('yahoo-finance')
var mongoose = require('mongoose')

mongoose.connect('mongodb://jo1ce:Alan0114@localhost:27018/trade', {useUnifiedTopology: true, useNewUrlParser: true });
const stock_history_data_model = mongoose.model('stock_history_data', new mongoose.Schema({symbol: String, closePrice: Number, Date: Date}));
const position_model = mongoose.model('position', new mongoose.Schema({symbol: String, avgPrice: Number, amount: Number}));

async function quotePosition() {
    
    position_symbol = []
    var result = await position_model.find();
    result.forEach(element => {
        position_symbol.push(element.symbol);
        // console.log(element.symbol);
    });
    position_symbol.pop()
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
    var symbols = await quotePosition();
    await quoteAndWriteDB(symbols);
    console.log(symbols)
    mongoose.connection.close();
}

main()