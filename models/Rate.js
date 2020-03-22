const { Schema, model } = require("mongoose");
const schema = new Schema({
  currencyValue: {
    type: Object,
    required: true
  },
  chart: {
    type: Number
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = model("Rates", schema);
