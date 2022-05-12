const {Schema, model} = require('mongoose');

const linkSchema = new Schema({

    name:String,
    source: {
        type:String,
        required:true
    },
    destination: {
        type: String,
        required:true
    },
    delay:Number,
    loss:Number,
    bandwith:Number
})

module.exports = model('link', linkSchema);