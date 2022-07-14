const { Schema, model } = require("mongoose");


/**
 * Creating a schema for the switch model
 * @param indicator A indicator created by the front, it is required and unique
 * @param delay A period of time by which a packet is late and is in "#ms" with # as an natural number
 * @param loss A percentage of packets lost in the link and is in "#" with # as an natural number
 * @param bandwidth the maximum rate of data whose can use the link simultaneously
 * @param from The device where the link comes from
 * @param to The device where the link go to
 * @param source The device's symbol where the link comes from
 * @param destination The device's symbol where the link go to
 * @param type The type of the devices, f. e. Controller, Switch, Host, Link
 * @param color The color on the front's camva 
 */
const linkSchema = new Schema({
  indicator: {
    type:String,
    required:true,
    unique:true
  } ,
  delay: Number,
  loss: Number,
  bandwidth: Number,
  from: Object,
  to: Object,
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  type: String,
  color: String,
});

module.exports = model("link", linkSchema);
