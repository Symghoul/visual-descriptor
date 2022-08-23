const { Schema, model } = require("mongoose");

/**
 * Creating a schema for the switch model
 * @param indicator A indicator created by the front, it is required and unique
 * @param name It is not used (for now), but for future features the clients could give a personalized name to the switch (f. e. the symbol or the port)
 * @param symbol It is a character's duo who starts with a "s" and is followed with a unrepeated number in all the topology (It is unique)
 * @param protocol The protocol in the switch (f. e. OVS or IVS) (it is required but actually only allows OVS)
 * @param port The port where the switch is listening to (it is required)
 * @param mac The mac address it is required and unique
 * @param controller The controller's symbol whose it is connected, it is required
 * @param type The type of the devices, f. e. Controller, Switch, Host, Link
 * @param x The position x on the front's camva
 * @param y The position y on the front's camva
 * @param color The color on the front's camva
 */
const switchSchema = new Schema({
  indicator: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  symbol: String,
  protocol: {
    type: String,
  },
  port: {
    type: Number,
    required: true,
  },
  mac: {
    type: String,
    required: true,
    unique: true,
  },
  controller: {
    type: String,
    required: true,
  },
  type: String,
  x: Number,
  y: Number,
  color: String,
});

module.exports = model("switch", switchSchema);
