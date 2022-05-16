const {Schema, model} = require('mongoose');

const hostSchema = new Schema({

    indicator: String,
    name:String,
    ip:{
        type: String,
        required:true,
        unique : true
    },
    mask:{
        type:String,
        required:true
    },
    symbol:String,
    mac:{
        type:String,
        required:true,
        unique : true
    },
    active: Boolean

})
module.exports = model('host', hostSchema);