const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.json(subject);
});

router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
