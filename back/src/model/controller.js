const { Schema, model } = require("mongoose");

const controllerSchema = new Schema({
  indicator: String,
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
