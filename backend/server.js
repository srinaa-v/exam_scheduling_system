const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const subjectRoutes = require("./routes/subjectRoutes");
const hallRoutes = require("./routes/hallRoutes");
const examRoutes = require("./routes/examRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/examScheduling")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/subjects", subjectRoutes);
app.use("/api/halls", hallRoutes);
app.use("/api/exams", examRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
