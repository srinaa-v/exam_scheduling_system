const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
  },
  date: String,
  start_time: String,
  end_time: String,
});

module.exports = mongoose.model("Exam", examSchema);
