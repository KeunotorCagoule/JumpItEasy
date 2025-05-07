const { pool } = require('./dbService');
const bcrypt = require('bcrypt');

// Récupérer le profil utilisateur par ID
async function getUserProfile(userId) {
  const client = await pool.connect();
  try {
    // Récupérer les informations de base de l'utilisateur
    const userResult = await client.query(
      'SELECT id, username, email, bio, country, language, created_at FROM users WHERE id = $1',
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
      country: user.country || '',
      language: user.language || 'fr',
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
    const { username, email, bio, country, language } = profileData;
    console.log("profileData: ", profileData);
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

    if (country !== undefined) {
      updateFields.push(`country = $${counter}`);
      values.push(country);
      counter++;
    }

    if (language !== undefined) {
      updateFields.push(`language = $${counter}`);
      values.push(language);
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
      RETURNING id, username, email, bio, country, language, created_at
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
    // Récupérer les informations de l'utilisateur
    const userResult = await client.query(
      'SELECT username, email, bio, country, language FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = userResult.rows[0];

    return {
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      country: user.country || '',
      language: user.language || 'fr'
    };
  } finally {
    client.release();
  }
}

// Mettre à jour les paramètres utilisateur
async function updateUserSettings(userId, settingsData) {
  const client = await pool.connect();
  try {
    // Mettre à jour les infos utilisateur dans la table users
    return await updateUserProfile(userId, {
      username: settingsData.username,
      email: settingsData.email,
      bio: settingsData.bio,
      country: settingsData.country,
      language: settingsData.language
    });
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

async function updateUserLanguage(userId, language) {
  const client = await pool.connect();
  try {
    // Mettre à jour la langue de l'utilisateur dans la table users
    await client.query(
      'UPDATE users SET language = $1 WHERE id = $2',
      [language, userId]
    );

    return true;
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
  getRecentCourses,
  updateUserLanguage
};
