var mongoose = require('mongoose')
var express = require('express')
require('dotenv').config()


const user = process.env.DB_USER;
const pw = process.env.DB_PASSWORD;
const svr = process.env.DB_SERVER;
const db = process.env.DB_NAME;
const port = process.env.PORT;

const app = express();
console.log(`mongodb://${user}:${pw}@${svr}:${port}/${db}`)
// mongoose.connect(`mongodb://${user}:${pw}@${svr}:${port}/${db}`, {useUnifiedTopology: true, useNewUrlParser: true })
// mongoose.connect(`mongodb://jo1ce:Alan0114@mongodb:27017/trade`, {useUnifiedTopology: true, useNewUrlParser: true })


const historicalTradeDataModel = mongoose.model('historical_trade_data', new mongoose.Schema({symbol: String, price: Number, amount: Number, date: Date}));
//historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});

app.get('/', (req, res)=>{
    console.log('receive get request')
    res.send('hello')
})

async function main(){

    app.listen(3100, ()=>{
        console.log('listening port 3100');
    })

    // await mongoose.connect(`mongodb://jo1ce:Alan0114@mongodb:27017/trade`, {useUnifiedTopology: true, useNewUrlParser: true })
    const openUrl = `mongodb://${user}:${pw}@${svr}:${port}/${db}`;
    await mongoose.connect(openUrl, {useUnifiedTopology: true, useNewUrlParser: true })

    await historicalTradeDataModel.find((err, res)=>{
        if(err) console.log(err)
        else console.log(res)
    }).catch(err=>{
        console.log(err);
    })
    // await historicalTradeDataModel.insertMany({symbol: 'PLTR', price: 21.50, amount: 5, date: new Date('2020-12-03')});
    //console.log(result)
    //mongoose.connection.close()

}
main();