const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");


// ✅ CREATE EXAM (WITH CONFLICT CHECK)
router.post("/", async (req, res) => {
  try {
    const { subject, hall, date, start_time, end_time } = req.body;

    // Basic validation
    if (!subject || !hall || !date || !start_time || !end_time) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (start_time >= end_time) {
      return res.status(400).json({
        message: "End time must be after start time",
      });
    }

    // 🔍 Check if same hall already booked on same date with overlapping time
    const existingExam = await Exam.findOne({
      hall,
      date,
      $or: [
        {
          start_time: { $lt: end_time },
          end_time: { $gt: start_time },
        },
      ],
    });

    if (existingExam) {
      return res.status(400).json({
        message: "Hall already booked for this time slot ❌",
      });
    }

    const newExam = new Exam({
      subject,
      hall,
      date,
      start_time,
      end_time,
    });

    await newExam.save();

    res.status(201).json({
      message: "Exam scheduled successfully ✅",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error scheduling exam",
    });
  }
});


// ✅ GET ALL EXAMS
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("subject")
      .populate("hall");

    res.json(exams);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching exams",
    });
  }
});


// ✅ DELETE EXAM
router.delete("/:id", async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);

    res.json({
      message: "Exam deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting exam",
    });
  }
});

module.exports = router;
