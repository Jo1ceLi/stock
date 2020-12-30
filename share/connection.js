var mongoose = require("mongoose");

require('dotenv').config()

function environmnet() {
    if(process.env.ENV==="PROD"){
        uri = `mongodb+srv://mdbadmin:Alan0114@cluster0.cwz8r.mongodb.net/portfolio?retryWrites=true&w=majority`
    }else if(process.env.ENV==="DEV"){
        uri = `mongodb://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASSWORD}@${process.env.DEV_DB_SERVER}:${process.env.DEV_PORT}
        /${process.env.DEV_DB_NAME}`;
    }else{
        uri = ""
    }
    return uri
}
var uri = environmnet();


module.exports = class connection{
    async connect(){
        await mongoose.connect(uri, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true})
        .then(console.log('DB connected!'))
        .catch(err=>{
            console.log(`Connect fail, err`,err)
        })
    }
}
