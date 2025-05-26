const express = require('express');
const { getParcoursList, getParcoursDetails, generateParcours, getParcoursByUser, toggleFavorite, deleteParcours, markCourseCompleted, getCourseCompletionStatus, saveGeneratedCourse } = require('../services/parcoursService');
const { verifyToken, optionalToken } = require('../services/authService');

const router = express.Router();

// Optional auth route: List of parcours (with or without favorites)
router.get('/', optionalToken, async (req, res) => {
  try {
    const includeFavorites = req.query.includeFavorites === 'true';
    const userId = req.user?.id; // Optional user ID from token
    
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

// Optional auth route: Details of a parcours (with optional favorite status)
router.get('/:id', optionalToken, async (req, res) => {
  try {
    const userId = req.user?.id; // Optional user ID from token
    const parcours = await getParcoursDetails(req.params.id, userId);
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

// Protected route: Save a generated course with layout
router.post('/save-generated', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const parcoursData = req.body;
    
    const savedParcours = await saveGeneratedCourse(parcoursData, userId);
    res.status(201).json(savedParcours);
  } catch (error) {
    console.error('Error saving generated course:', error);
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

// Protected route: Delete a parcours (only by creator)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const parcoursId = req.params.id;
    
    const result = await deleteParcours(parcoursId, userId);
    res.status(200).json({ 
      message: 'Parcours deleted successfully', 
      ...result 
    });
  } catch (error) {
    console.error('Error deleting parcours:', error);
    
    // Handle specific error cases
    if (error.statusCode === 403) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// Protected route: Mark course as completed
router.post('/:id/complete', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;
    const { completionRate = 100 } = req.body;
    
    const result = await markCourseCompleted(courseId, userId, completionRate);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error marking course as completed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Protected route: Get course completion status
router.get('/:id/completion', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;
    
    const completion = await getCourseCompletionStatus(courseId, userId);
    res.status(200).json(completion);
  } catch (error) {
    console.error('Error getting completion status:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
