const {Schema, model} = require('mongoose');


const controllerSchema = new Schema({

    
    name: String,
    port: {
        type: Number,
        required: true
    },
    symbol: String,
    indicator: String,
    type: String,
    ip:{
        type: String,
        required: true,
        unique : true
    },
    remote: Boolean

})


module.exports = model('controller', controllerSchema);