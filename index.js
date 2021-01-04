var express = require('express');
//middle ware
var cors = require('cors');
var bodyParser = require('body-parser');
// DB connection
var connection = require("./share/connection");
const Connection = new connection()
Connection.connect();

const app = express();

//route
const tradeRoute = require('./routes/trade');
const positionRoute = require('./routes/position');


// midleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.use('/', tradeRoute);
app.use('/', positionRoute);

app.listen(8080, 
    ()=>console.log('Server up and running'));
