var mongoose = require("mongoose");
const secrect = require('../secret');

require('dotenv').config()

async function environmnet() {
    const dbConnectString = await secrect('projects/373314551889/secrets/mongoDB-connect-string/versions/latest');
    if(process.env.ENV==="PROD"){
        uri = dbConnectString
    }else if(process.env.ENV==="DEV"){
        uri = `mongodb://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_SERVER}:${process.env.DEV_PORT}
        /${process.env.DEV_DB_NAME}`;
    }else{
        uri = ""
    }
    return uri
}

module.exports = class connection{
    async connect(){
        var uri = await environmnet();
        await mongoose.connect(uri, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true})
        .then(console.log('DB connected!'))
        .catch(err=>{
            console.log(`Connect fail, err`,err)
        })
    }
}
