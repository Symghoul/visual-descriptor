const {Schema, model} = require('mongoose');


const controllerSchema = new Schema({
    symbol: String,
    name: String,
    port: {
        type: Number,
        required: true
    },
    type: String,
    ip:{
        type: String,
        required: true,
        unique : true
    },
    remote: Boolean

})


module.exports = model('controller', controllerSchema);