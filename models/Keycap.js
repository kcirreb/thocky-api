const mongoose = require("mongoose");

const KeycapSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  brand: { type: String, required: true },
  designer: String,
  profile: { type: String, required: true },
  material: { type: String, required: true },
  legends: String,
});

module.exports = mongoose.model("Keycap", KeycapSchema);
