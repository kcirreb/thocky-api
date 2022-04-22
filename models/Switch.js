const mongoose = require("mongoose");

const SwitchSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, required: true },
  mount: Object,
  materials: Object,
  spring: Object,
  travel: Object,
});

module.exports = mongoose.model("Switch", SwitchSchema);
