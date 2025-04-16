const express = require('express');
const { login, register } = require('../services/authService');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
