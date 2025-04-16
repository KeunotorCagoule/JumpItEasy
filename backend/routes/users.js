const express = require('express');
const { verifyToken } = require('../services/authService');
const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(verifyToken);

// Route pour récupérer le profil utilisateur
router.get('/profile', async (req, res) => {
  try {
    // L'utilisateur décodé du token est disponible dans req.user
    const userId = req.user.id;
    const username = req.user.username;

    // Dans un cas réel, vous feriez une requête à la base de données ici
    // Simulation de données de profil pour démonstration
    const profile = {
      id: userId,
      username: username,
      email: "user@example.com", // À remplacer par les vraies données de la BDD
      bio: "Passionné(e) d'équitation et de saut d'obstacles depuis 10 ans.",
      location: "Paris, France",
      joinedDate: "Janvier 2023",
      favoriteCourses: 12,
      completedCourses: 25,
      createdCourses: 8
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour récupérer les parcours récents
router.get('/courses/recent', async (req, res) => {
  try {
    // Simulation de données pour démonstration
    const courses = [
      {
        id: "1",
        title: "Parcours technique avancé",
        difficulty: "Avancé",
        date: "15/06/2023",
        completionRate: 100
      },
      {
        id: "2",
        title: "Initiation aux combinaisons",
        difficulty: "Intermédiaire",
        date: "02/07/2023",
        completionRate: 85
      },
      {
        id: "3",
        title: "Parcours nature pour débutants",
        difficulty: "Débutant",
        date: "12/08/2023",
        completionRate: 100
      }
    ];
    
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
    
    // Ici, vous mettriez à jour le profil dans la base de données
    // Pour l'exemple, on renvoie simplement les données reçues
    const updatedProfile = {
      id: userId,
      username: profileData.username || req.user.username,
      email: profileData.email || "user@example.com",
      bio: profileData.bio || "",
      location: profileData.location || "",
      joinedDate: "Janvier 2023",
      favoriteCourses: 12,
      completedCourses: 25,
      createdCourses: 8
    };
    
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

// Route pour récupérer les paramètres utilisateur
router.get('/settings', async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;
    
    // Simulation des paramètres utilisateur pour démonstration
    const settings = {
      username: username,
      email: "user@example.com",
      bio: "Passionné(e) d'équitation et de saut d'obstacles depuis 10 ans.",
      location: "Paris, France",
      language: "fr",
      darkMode: false,
      emailNotifications: true,
      appNotifications: true,
      marketingEmails: false,
      twoFactorAuth: false,
      publicProfile: true
    };
    
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
    
    // Ici, vous mettriez à jour les paramètres dans la base de données
    // Pour l'exemple, on renvoie simplement les données reçues avec des valeurs par défaut
    const updatedSettings = {
      username: settingsData.username || req.user.username,
      email: settingsData.email || "user@example.com",
      bio: settingsData.bio || "",
      location: settingsData.location || "",
      language: settingsData.language || "fr",
      darkMode: settingsData.darkMode !== undefined ? settingsData.darkMode : false,
      emailNotifications: settingsData.emailNotifications !== undefined ? settingsData.emailNotifications : true,
      appNotifications: settingsData.appNotifications !== undefined ? settingsData.appNotifications : true,
      marketingEmails: settingsData.marketingEmails !== undefined ? settingsData.marketingEmails : false,
      twoFactorAuth: settingsData.twoFactorAuth !== undefined ? settingsData.twoFactorAuth : false,
      publicProfile: settingsData.publicProfile !== undefined ? settingsData.publicProfile : true
    };
    
    res.status(200).json(updatedSettings);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
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
    
    // Dans un cas réel, vous vérifieriez le mot de passe actuel dans la base de données
    // et vous le mettriez à jour s'il est correct
    
    // Simulation d'une réponse réussie
    res.status(200).json({ 
      success: true, 
      message: 'Mot de passe modifié avec succès'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: error.message || 'Une erreur est survenue' });
  }
});

module.exports = router;
