const {Schema, model} = require('mongoose');

const switchSchema = new Schema({

    indicator: String,
    name: String,
    symbol:String,
    controller: {
        type:String,
        required:true
    },
    mac: {
        type:String,
        required:true,
        unique : true
    },
    protocol: {
        type: String,
        required : true
    },
    listenPort:{
        type: Number,
        required: true
    },
    type:String,
    
})

module.exports = model('switch', switchSchema);