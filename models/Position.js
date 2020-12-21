var mongoose = require('mongoose');
var connection = require("../share/connection");

const Connection = new connection()
Connection.connect();

const positionSchema = new mongoose.Schema(
    {
        symbol:{
            type: String,
            required: true
        },
        cost:{
            type: Number,
            required: true
        },
        amount:{
            type: Number,
            required: true
        }
    }
)

exports.PositionModel = mongoose.model('position', positionSchema);

async function main(){
    
    
    await Position.insertMany(positionDatas)
    .then(value=>{
        console.log(value);
    });
    
    mongoose.connection.close();
}
