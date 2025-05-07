const express = require('express');
const { getParcoursList, getParcoursDetails, generateParcours, getParcoursByUser } = require('../services/parcoursService');
const { verifyToken } = require('../services/authService');

const router = express.Router();

// Protected route: List of parcours
router.get('/', async (req, res) => {
  try {
    const parcours = await getParcoursList();
    res.status(200).json(parcours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route: Details of a parcours
router.get('/:id', async (req, res) => {
  try {
    const parcours = await getParcoursDetails(req.params.id);
    res.status(200).json(parcours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route: Generate a new parcours
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const parcoursData = req.body;
    
    const newParcours = await generateParcours(parcoursData, userId);
    res.status(201).json(newParcours);
  } catch (error) {
    console.error('Error generating parcours:', error);
    res.status(500).json({ error: error.message });
  }
});

// Protected route: Get user's parcours
router.get('/user/me', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const parcours = await getParcoursByUser(userId);
    res.status(200).json(parcours);
  } catch (error) {
    console.error('Error fetching user parcours:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
