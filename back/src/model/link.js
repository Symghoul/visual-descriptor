const { Schema, model } = require("mongoose");

const linkSchema = new Schema({
  indicator: String,
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
