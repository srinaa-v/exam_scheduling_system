const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
  hall_name: String,
  capacity: Number,
  from_roll: String,   // 👈 ADD
  to_roll: String      // 👈 ADD
});

module.exports = mongoose.model("Hall", hallSchema);