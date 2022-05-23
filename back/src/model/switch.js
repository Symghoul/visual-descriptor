const { Schema, model } = require("mongoose");

const switchSchema = new Schema({
  indicator: String,
  name: String,
  symbol: String,
  protocol: {
    type: String,
    required: true,
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
  x: String,
  y: String,
  color: String,
});

module.exports = model("switch", switchSchema);
