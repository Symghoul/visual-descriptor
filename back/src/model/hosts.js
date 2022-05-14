const {Schema, model} = require('mongoose');

const hostSchema = new Schema({

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
    mac:{
        type:String,
        required:true,
        unique : true
    },
    active: Boolean

})
module.exports = model('host', hostSchema);