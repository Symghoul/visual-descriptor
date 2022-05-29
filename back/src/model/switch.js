const { Schema, model } = require("mongoose");

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
  x: Number,
  y: Number,
  color: String,
});

module.exports = model("switch", switchSchema);
