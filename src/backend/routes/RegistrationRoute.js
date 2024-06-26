const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Adjust the path as necessary
const router = express.Router();

router.post('/register', async (req, res) => {
  const { fullName, email, password, teamCode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const user = new User({ fullName, email, password, teamCode });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'JWT_SECRET');
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;  
