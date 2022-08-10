const { Schema, model } = require("mongoose");

/**
 * Creating a schema for the controller model
 * @param indicator A indicator created by the front, it is required and unique
 * @param name It is not used (for now), but for future features the clients could give a personalized name to the controller (f. e. the Ip address)  
 * @param symbol It is a character's duo who starts with a "c" and is followed with a unrepeated number in all the topology (It is unique) 
 * @param ip The Ip addrees, it is required and unique
 * @param port The port of the controller , it is required
 * @param remote A boolean who answer if it is a remote controller
 * @param type The type of the devices, f. e. Controller, Switch, Host, Link
 * @param x The position x on the front's camva 
 * @param y The position y on the front's camva 
 * @param color The color on the front's camva 
 */
const controllerSchema = new Schema({
  indicator:{
    type:String,
    required:true,
    unique:true
  } ,
  name: String,
  symbol: String,
  ip: {
    type: String,
    required: true,
    unique: true,
  },
  port: {
    type: Number,
    required: true,
  },
  remote: Boolean,
  type: String,
  x: Number,
  y: Number,
  color: String,
});

module.exports = model("controller", controllerSchema);
