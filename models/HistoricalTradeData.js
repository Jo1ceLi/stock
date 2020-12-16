var mongoose = require('mongoose');


require('dotenv').config()
var user;
var pw;
var svr;
var db;
var port;
if(process.env.ENV==="DEV"){
    // console.log('Dev environment configuration is preparing')
    user = process.env.DEV_DB_USER;
    pw = process.env.DEV_DB_PASSWORD;
    svr = process.env.DEV_DB_SERVER;
    db = process.env.DEV_DB_NAME;
    port = process.env.DEV_PORT;
}else if(process.env.ENV==="PROD"){
    // console.log('Production environment configuration is preparing')
    user = process.env.PROD_DB_USER;
    pw = process.env.PROD_DB_PASSWORD;
    svr = process.env.PROD_DB_SERVER;
    db = process.env.PROD_DB_NAME;
    port = process.env.PROD_PORT;
}else{
    console.log('Can not recognize this enviroment')
}

const openUrl = `mongodb://${user}:${pw}@${svr}:${port}/${db}`;
const options = {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true}
mongoose.connect(openUrl, options)
.then(console.log('DB connected!'))

const historicalTradeDataSchema = new mongoose.Schema(
    {
        symbol:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        date:{
            type: Date,
            required: true
        }
    }
)

exports.HistoricalTradeDataModel = mongoose.model('historical_trade_data', historicalTradeDataSchema);

async function main(){
    
    
    await Position.insertMany(positionDatas)
    .then(value=>{
        console.log(value);
    });
    
    mongoose.connection.close();
}


