const axios = require('axios').default;
const historicalPosition = require('../models/HistoricalPosition');
var mongoose = require('mongoose');
var connection = require('../share/connection');

const Connection = new connection();

const HistoricalPositionModel = historicalPosition.HistoricalPositionModel;

let responseDatas;

async function main(){
    Connection.connect();
    //get datas from today positions
    await axios.get('https://basic-dispatch-298807.df.r.appspot.com/api/positions')
    .then(response => {
        responseDatas = response.data;
    })
    .catch(rejection => {
        console.log(rejection);
    });

    // NY date time 
    let nyTime = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'});

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
    mongoose.connection.close();

}
main()