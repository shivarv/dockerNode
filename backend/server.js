const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// --------------------------
// MongoDB Connection
// --------------------------
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("✅ MongoDB Connected");

  // Start server only after successful DB connection
  app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
})
.catch(err => {
  console.error("❌ DB Connection Error:", err);
  process.exit(1); // Exit process if DB connection fails
});

// --------------------------
// Mongoose Model
// --------------------------
const User = mongoose.models.User || mongoose.model(
  "User", 
  new mongoose.Schema({ name: { type: String, required: true } })
);

// --------------------------
// API Routes
// --------------------------
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node + MongoDB!" });
});

app.post("/api/users", async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: err.message,
      stack: err.stack
    });
  }
});

// --------------------------
// Serve React frontend (production)
// --------------------------
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "frontend/build");

  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}
