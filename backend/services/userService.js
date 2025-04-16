const { pool } = require('./dbService');
const bcrypt = require('bcrypt');

// Récupérer le profil utilisateur par ID
async function getUserProfile(userId) {
  const client = await pool.connect();
  try {
    // Récupérer les informations de base de l'utilisateur
    const userResult = await client.query(
      'SELECT id, username, email, bio, location, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userResult.rows[0];
    
    // Compter les parcours favoris de l'utilisateur (exemple de requête)
    const favoritesResult = await client.query(
      'SELECT COUNT(*) as count FROM user_favorites WHERE user_id = $1',
      [userId]
    );
    
    // Compter les parcours complétés
    const completedResult = await client.query(
      'SELECT COUNT(*) as count FROM user_completed_courses WHERE user_id = $1',
      [userId]
    );
    
    // Compter les parcours créés
    const createdResult = await client.query(
      'SELECT COUNT(*) as count FROM parcours WHERE creator_id = $1',
      [userId]
    );

    // Formater la date d'inscription
    const joinDate = new Date(user.created_at);
    const month = joinDate.toLocaleString('default', { month: 'long' });
    const year = joinDate.getFullYear();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      location: user.location || '',
      joinedDate: `${month} ${year}`,
      favoriteCourses: parseInt(favoritesResult.rows[0].count),
      completedCourses: parseInt(completedResult.rows[0].count),
      createdCourses: parseInt(createdResult.rows[0].count)
    };
  } finally {
    client.release();
  }
}

// Mettre à jour le profil utilisateur
async function updateUserProfile(userId, profileData) {
  const client = await pool.connect();
  try {
    const { username, email, bio, location } = profileData;
    
    // Vérifier si l'username est déjà pris
    if (username) {
      const existingUser = await client.query(
        'SELECT id FROM users WHERE username = $1 AND id != $2',
        [username, userId]
      );
      
      if (existingUser.rows.length > 0) {
        throw new Error('Ce nom d\'utilisateur est déjà pris');
      }
    }
    
    // Vérifier si l'email est déjà pris
    if (email) {
      const existingEmail = await client.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, userId]
      );
      
      if (existingEmail.rows.length > 0) {
        throw new Error('Cet email est déjà utilisé');
      }
    }
    
    // Construire la requête de mise à jour dynamiquement
    let updateFields = [];
    let values = [];
    let counter = 1;
    
    if (username) {
      updateFields.push(`username = $${counter}`);
      values.push(username);
      counter++;
    }
    
    if (email) {
      updateFields.push(`email = $${counter}`);
      values.push(email);
      counter++;
    }
    
    if (bio !== undefined) {
      updateFields.push(`bio = $${counter}`);
      values.push(bio);
      counter++;
    }
    
    if (location !== undefined) {
      updateFields.push(`location = $${counter}`);
      values.push(location);
      counter++;
    }
    
    if (updateFields.length === 0) {
      return await getUserProfile(userId);
    }
    
    // Ajouter l'ID utilisateur comme dernier paramètre
    values.push(userId);
    
    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')} 
      WHERE id = $${counter} 
      RETURNING id, username, email, bio, location, created_at
    `;
    
    const result = await client.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('Failed to update user profile');
    }
    
    // Récupérer le profil mis à jour
    return await getUserProfile(userId);
  } finally {
    client.release();
  }
}

// Récupérer les paramètres utilisateur
async function getUserSettings(userId) {
  const client = await pool.connect();
  try {
    // Récupérer les informations de base de l'utilisateur
    const userResult = await client.query(
      'SELECT username, email, bio, location FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userResult.rows[0];
    
    // Récupérer les préférences de l'utilisateur
    const prefsResult = await client.query(
      'SELECT language, dark_mode, email_notifications, app_notifications, marketing_emails, two_factor_auth, public_profile FROM user_preferences WHERE user_id = $1',
      [userId]
    );
    
    // Si l'utilisateur n'a pas encore de préférences, retourner des valeurs par défaut
    const prefs = prefsResult.rows.length > 0 ? prefsResult.rows[0] : {
      language: 'fr',
      dark_mode: false,
      email_notifications: true,
      app_notifications: true,
      marketing_emails: false,
      two_factor_auth: false,
      public_profile: true
    };

    return {
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      location: user.location || '',
      language: prefs.language,
      darkMode: prefs.dark_mode,
      emailNotifications: prefs.email_notifications,
      appNotifications: prefs.app_notifications,
      marketingEmails: prefs.marketing_emails,
      twoFactorAuth: prefs.two_factor_auth,
      publicProfile: prefs.public_profile
    };
  } finally {
    client.release();
  }
}

// Mettre à jour les paramètres utilisateur
async function updateUserSettings(userId, settingsData) {
  const client = await pool.connect();
  try {
    // Commencer une transaction
    await client.query('BEGIN');
    
    // Mettre à jour les infos utilisateur dans la table users
    if (settingsData.username || settingsData.email || settingsData.bio !== undefined || settingsData.location !== undefined) {
      await updateUserProfile(userId, {
        username: settingsData.username,
        email: settingsData.email,
        bio: settingsData.bio,
        location: settingsData.location
      });
    }
    
    // Mettre à jour les préférences dans la table user_preferences
    const preferenceFields = [
      'language', 'darkMode', 'emailNotifications', 'appNotifications', 
      'marketingEmails', 'twoFactorAuth', 'publicProfile'
    ];
    
    // Vérifier si des préférences sont à mettre à jour
    const hasPreferences = preferenceFields.some(field => settingsData[field] !== undefined);
    
    if (hasPreferences) {
      // Vérifier si l'utilisateur a déjà des préférences
      const existingPrefs = await client.query(
        'SELECT 1 FROM user_preferences WHERE user_id = $1',
        [userId]
      );
      
      if (existingPrefs.rows.length > 0) {
        // Construire la requête de mise à jour
        let updateFields = [];
        let values = [];
        let counter = 1;
        
        if (settingsData.language !== undefined) {
          updateFields.push(`language = $${counter}`);
          values.push(settingsData.language);
          counter++;
        }
        
        if (settingsData.darkMode !== undefined) {
          updateFields.push(`dark_mode = $${counter}`);
          values.push(settingsData.darkMode);
          counter++;
        }
        
        if (settingsData.emailNotifications !== undefined) {
          updateFields.push(`email_notifications = $${counter}`);
          values.push(settingsData.emailNotifications);
          counter++;
        }
        
        if (settingsData.appNotifications !== undefined) {
          updateFields.push(`app_notifications = $${counter}`);
          values.push(settingsData.appNotifications);
          counter++;
        }
        
        if (settingsData.marketingEmails !== undefined) {
          updateFields.push(`marketing_emails = $${counter}`);
          values.push(settingsData.marketingEmails);
          counter++;
        }
        
        if (settingsData.twoFactorAuth !== undefined) {
          updateFields.push(`two_factor_auth = $${counter}`);
          values.push(settingsData.twoFactorAuth);
          counter++;
        }
        
        if (settingsData.publicProfile !== undefined) {
          updateFields.push(`public_profile = $${counter}`);
          values.push(settingsData.publicProfile);
          counter++;
        }
        
        if (updateFields.length > 0) {
          // Ajouter l'ID utilisateur comme dernier paramètre
          values.push(userId);
          
          const query = `
            UPDATE user_preferences 
            SET ${updateFields.join(', ')} 
            WHERE user_id = $${counter}
          `;
          
          await client.query(query, values);
        }
      } else {
        // Insérer de nouvelles préférences
        await client.query(`
          INSERT INTO user_preferences (
            user_id, language, dark_mode, email_notifications, 
            app_notifications, marketing_emails, two_factor_auth, public_profile
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          userId,
          settingsData.language || 'fr',
          settingsData.darkMode !== undefined ? settingsData.darkMode : false,
          settingsData.emailNotifications !== undefined ? settingsData.emailNotifications : true,
          settingsData.appNotifications !== undefined ? settingsData.appNotifications : true,
          settingsData.marketingEmails !== undefined ? settingsData.marketingEmails : false,
          settingsData.twoFactorAuth !== undefined ? settingsData.twoFactorAuth : false,
          settingsData.publicProfile !== undefined ? settingsData.publicProfile : true
        ]);
      }
    }
    
    // Valider la transaction
    await client.query('COMMIT');
    
    // Récupérer les paramètres mis à jour
    return await getUserSettings(userId);
  } catch (error) {
    // Annuler la transaction en cas d'erreur
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Changer le mot de passe utilisateur
async function changeUserPassword(userId, currentPassword, newPassword) {
  const client = await pool.connect();
  try {
    // Récupérer le mot de passe actuel de l'utilisateur
    const result = await client.query(
      'SELECT password FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    const user = result.rows[0];
    
    // Vérifier que le mot de passe actuel est correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      const error = new Error('Current password is incorrect');
      error.statusCode = 401;
      throw error;
    }
    
    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe
    await client.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, userId]
    );
    
    return true;
  } finally {
    client.release();
  }
}

// Récupérer les parcours récents de l'utilisateur
async function getRecentCourses(userId) {
  const client = await pool.connect();
  try {
    // Dans une application réelle, cette requête serait plus complexe et reliée à vos tables
    const result = await client.query(`
      SELECT p.id, p.title, p.difficulty, p.created_at, 
             CASE WHEN uc.completion_rate IS NOT NULL THEN uc.completion_rate ELSE NULL END as completion_rate
      FROM parcours p
      LEFT JOIN user_completed_courses uc ON p.id = uc.course_id AND uc.user_id = $1
      WHERE p.creator_id = $1 OR uc.user_id = $1
      ORDER BY p.created_at DESC
      LIMIT 3
    `, [userId]);
    
    // Formater les résultats
    return result.rows.map(course => {
      const date = new Date(course.created_at);
      return {
        id: course.id,
        title: course.title,
        difficulty: course.difficulty,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        completionRate: course.completion_rate
      };
    });
  } finally {
    client.release();
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserSettings,
  updateUserSettings,
  changeUserPassword,
  getRecentCourses
};
