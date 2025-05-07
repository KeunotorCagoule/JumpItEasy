const express = require('express');
const { getParcoursList, getParcoursDetails } = require('../services/parcoursService');

const router = express.Router();

// Protected route: List of parcours
router.get('/list', async (req, res) => {
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

module.exports = router;
