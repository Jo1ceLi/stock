var mongoose = require("mongoose");
var connection = require("./share/connection");

const Connection = new connection()
Connection.connect();

// uri = "mongodb+srv://mdbadmin:Alan0114@cluster0.cwz8r.mongodb.net/portfolio?retryWrites=true&w=majority"
// var res = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
//     if(err) console.log(err);
// })

const Position = mongoose.model('Position', new mongoose.Schema({ symbol: String, amount: Number }));

Position.find((err, res)=>{
    if(err) console.log(err)
    console.log(res)
})