const User = require("../models/Users");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoutes = require("./authRoutes")

// Register a new user
const registerUser = async (req, res) => {
  const { fullName, email, password, role, teamCode } = req.body;

  // Basic validation
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      teamCode,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//----------------------------------------------------------------------------------//


// Login a user
const router = express.Router();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
