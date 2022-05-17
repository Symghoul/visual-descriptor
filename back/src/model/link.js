const {Schema, model} = require('mongoose');

const linkSchema = new Schema({

    indicator: String,
    name:String,
    source: {
        type:String,
        required:true
    },
    symbol: String,
    destination: {
        type: String,
        required:true
    },
    delay:Number,
    loss:Number,
    bandwith:Number
})

module.exports = model('link', linkSchema);