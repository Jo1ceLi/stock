const axios = require('axios').default;
const historicalPosition = require('../models/HistoricalPosition');
const historicalCashDataModel = require('../models/HistoricalCashData');
const cashData = require('../models/cashData');
var mongoose = require('mongoose');
var connection = require('../share/connection');

const Connection = new connection();

const HistoricalPositionModel = historicalPosition.HistoricalPositionModel;
const CashDataModel = cashData.CashDataModel;
let responseDatas;
let todayCashData;
async function main(){
    Connection.connect();

    // NY date time 
    let nyTime = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'});

    //get datas from today positions
    await axios.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions')
    .then(response => {
        responseDatas = response.data;
    })
    .catch(rejection => {
        console.log(rejection);
    });

    await CashDataModel.find({}, 
        (err, res)=>{
            if(err){
                console.log(err)
            }else{
                todayCashData = {
                    currency: res[0].currency,
                    amount: res[0].amount,
                    date: nyTime
                }
            }
        }
    );


    // clean datas
    responseDatas.forEach(element=>{
        delete element._id
        delete element.__v
        element.date = nyTime
    });

    // write datas to historical position database

    await HistoricalPositionModel.insertMany(responseDatas)
    .then(res => {
        console.log('Successful inserted today position datas');
    })
    .catch(err=>{
        console.log('Fail to insert datas to database');
    })

    await historicalCashDataModel.insertMany(todayCashData)
    .then(()=>{
        console.log('Successful insert today cash datas');
    }).catch(err=>{
        console.log('Fail to insert cash data to DB', err);
    })
    mongoose.connection.close();

}
main()