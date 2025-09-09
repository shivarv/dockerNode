const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Simple schema
const User = mongoose.model("User", new mongoose.Schema({ name: String }));

// API Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node + MongoDB!" });
});

app.post("/api/users", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: err.message + ' stack '+err.stack,
      stack: err.stack  // optional, useful for debugging
    });
  }
});

// --------------------------
// Serve React frontend
// --------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Backend running on port ${port}`));