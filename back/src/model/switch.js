const {Schema, model} = require('mongoose');

const switchSchema = new Schema({

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
    }
    
})

module.exports = model('switch', switchSchema);