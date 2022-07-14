const { Schema, model } = require("mongoose");

/**  
 * Creating a schema for the host model.
 * @param indicator A indicator created by the front, it is required and unique
 * @param name It is not used (for now), but for future features the clients could give a personalized name to the host (f. e. the Ip address)
 * @param symbol It is a character's duo who starts with a "h" and is followed with a unrepeated number in all the topology (It is unique) 
 * @param ip The Ip address, it is required and unique
 * @param mask The mask of the ip address (4 bytes), for example 255.255.255.0, 255.255.255.252 is required
 * @param mac The mac address it is required and unique
 * @param mask2script The mask of the ip address, for example /24, /30
 * @param active A boolean who says if the host is working but is not used (for now), the idea is used to change or not before the deployment 
 * @param type The type of the devices, f. e. Controller, Switch, Host, Link
 * @param x The position x on the front's camva 
 * @param y The position y on the front's camva 
 * @param color The color on the front's camva 
 * */
const hostSchema = new Schema({
  indicator: {
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
  mask: {
    type: String,
    required: true,
  },
  mac: {
    type: String,
    required: true,
    unique: true,
  },
  mask2script: String,
  active: Boolean,
  type: String,
  x: Number,
  y: Number,
  color: String,
});
module.exports = model("host", hostSchema);
