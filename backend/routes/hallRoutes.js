const express = require("express");
const router = express.Router();
const Hall = require("../models/Hall");

router.post("/", async (req, res) => {
  const hall = new Hall(req.body);
  await hall.save();
  res.json(hall);
});

router.get("/", async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
});

router.delete("/:id", async (req, res) => {
  await Hall.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
