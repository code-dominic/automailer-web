const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User not found" });

    // Verify password using passport-local-mongoose
    user.authenticate(password, (err, authenticatedUser) => {
      if (err || !authenticatedUser) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user._id, username: user.username }, "your_secret_key", { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
