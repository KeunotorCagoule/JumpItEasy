const express = require('express');
const { verifyToken } = require('../services/authService');
const userService = require('../services/userService');
const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(verifyToken);

// Route pour récupérer le profil utilisateur
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    // Utiliser le service pour obtenir les données de profil réelles
    const profile = await userService.getUserProfile(userId);
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour récupérer les parcours récents
router.get('/courses/recent', async (req, res) => {
  try {
    const userId = req.user.id;
    // Utiliser le service pour obtenir les parcours récents depuis la BDD
    const courses = await userService.getRecentCourses(userId);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching recent courses:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour mettre à jour le profil utilisateur
router.put('/profile', async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    // Utiliser le service pour mettre à jour le profil dans la BDD
    const updatedProfile = await userService.updateUserProfile(userId, profileData);
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(400).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour récupérer les paramètres utilisateur
router.get('/settings', async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Utiliser le service pour obtenir les paramètres réels depuis la BDD
    const settings = await userService.getUserSettings(userId);
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour mettre à jour les paramètres utilisateur
router.put('/settings', async (req, res) => {
  try {
    const userId = req.user.id;
    const settingsData = req.body;
    
    // Utiliser le service pour mettre à jour les paramètres dans la BDD
    const updatedSettings = await userService.updateUserSettings(userId, settingsData);
    res.status(200).json(updatedSettings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(400).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour changer le mot de passe
router.post('/change-password', async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Vérifier que tous les champs requis sont présents
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    
    // Vérifier que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Les nouveaux mots de passe ne correspondent pas' });
    }
    
    // Utiliser le service pour changer le mot de passe dans la BDD
    await userService.changeUserPassword(userId, currentPassword, newPassword);
    
    res.status(200).json({ 
      success: true, 
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    // Vérifier si l'erreur est liée à un mot de passe incorrect
    if (error.statusCode === 401) {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// changer la langue de l'utilisateur
router.put('/language', async (req, res) => {
  try {
    const userId = req.user.id;
    const { language } = req.body;
    
    // Vérifier que la langue est fournie
    if (!language) {
      return res.status(400).json({ error: 'La langue est requise' });
    }
    
    // Utiliser le service pour changer la langue dans la BDD
    await userService.updateUserLanguage(userId, language);
    
    res.status(200).json({ 
      success: true, 
      message: 'Langue modifiée avec succès'
    });
  } catch (error) {
    console.error('Error changing language:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

module.exports = router;
