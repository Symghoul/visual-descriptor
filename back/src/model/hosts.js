const { Schema, model } = require("mongoose");

const hostSchema = new Schema({
  indicator: String,
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
  active: Boolean,
  type: String,
  x: Number,
  y: Number,
  color: String,
});
module.exports = model("host", hostSchema);
