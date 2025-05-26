const express = require('express');
const { getParcoursList, getParcoursDetails, generateParcours, getParcoursByUser, toggleFavorite } = require('../services/parcoursService');
const { verifyToken, optionalToken } = require('../services/authService');

const router = express.Router();

// Optional auth route: List of parcours (with or without favorites)
router.get('/', optionalToken, async (req, res) => {
  try {
    const includeFavorites = req.query.includeFavorites === 'true';
    const userId = req.user?.id; // Optional user ID from token
    
    // Enhanced debugging
    console.log('=== DEBUG PARCOURS LIST ===');
    console.log('User ID:', userId);
    console.log('Include favorites:', includeFavorites);
    console.log('========================');
    
    const parcours = await getParcoursList(userId, includeFavorites);
    res.status(200).json(parcours);
  } catch (error) {
    console.error('Error in parcours list route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Toggle favorite status
router.post('/favorite/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const parcoursId = req.params.id;
    
    const result = await toggleFavorite(parcoursId, userId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error toggling favorite:', error);
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
