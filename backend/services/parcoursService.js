const { pool } = require('./dbService');

// Get list of parcours with optional favorite status
async function getParcoursList(userId = null, includeFavorites = false) {
  const client = await pool.connect();
  try {
    let query = 'SELECT * FROM parcours WHERE private = false';
    
    // If we need to include favorite status and have a userId
    console.log(`Fetching parcours with includeFavorites=${includeFavorites} for userId=${userId}`);
    if (includeFavorites && userId) {
      // First, get all public parcours
      const parcoursResult = await client.query(query);
      
      // Then, get all favorites for this user
      const favoritesResult = await client.query(
        'SELECT course_id FROM user_favorites WHERE user_id = $1',
        [userId]
      );
      
      // Create a set of favorite course IDs for fast lookup
      const favoriteIds = new Set(favoritesResult.rows.map(row => row.course_id));
      
      // Mark parcours as favorite if they're in the favorites list
      const parcours = parcoursResult.rows.map(parcours => ({
        ...parcours,
        is_favorite: favoriteIds.has(parcours.id)
      }));
      
      console.log(`Fetched ${parcours.length} parcours with ${favoriteIds.size} favorites for user ${userId}`);
      return parcours;
    } else {
      console.log('Fetching parcours without favorites');
      const result = await client.query(query);
      return result.rows;
    }
  } finally {
    client.release();
  }
}

// Generate a new parcours
async function generateParcours(parcoursData, userId) {
  const client = await pool.connect();
  try {
    // Extract data from the request
    const { 
      title, 
      description, 
      difficulty, 
      water,
      courseType,
      isPrivate
    } = parcoursData;

    // Insert the new parcours with simplified fields
    const result = await client.query(
      `INSERT INTO parcours 
       (title, description, difficulty, water_elements, course_type, private, creator_id, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [
        title,
        description,
        difficulty,
        water,
        courseType,
        isPrivate,
        userId
      ]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

// Get parcours created by a specific user
async function getParcoursByUser(userId) {
  const client = await pool.connect();
  try {
    // Get all parcours created by the user
    const result = await client.query(`
      SELECT p.*, 
             CASE WHEN uc.completion_rate IS NOT NULL THEN uc.completion_rate ELSE NULL END as completion_rate,
             CASE WHEN uf.id IS NOT NULL THEN true ELSE false END as is_favorite
      FROM parcours p
      LEFT JOIN user_completed_courses uc ON p.id = uc.course_id AND uc.user_id = $1
      LEFT JOIN user_favorites uf ON p.id = uf.course_id AND uf.user_id = $1
      WHERE p.creator_id = $1 OR uc.user_id = $1
      ORDER BY p.created_at DESC
    `, [userId]);
    
    return result.rows;
  } finally {
    client.release();
  }
}

async function getParcoursDetails(id) {
  const client = await pool.connect();
  try {
    // Get parcours details
    const result = await client.query(
      'SELECT * FROM parcours WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new Error('Parcours not found');
    }

    return result.rows[0];
  } finally {
    client.release();
  }
}

// Toggle favorite status for a parcours
async function toggleFavorite(parcoursId, userId) {
  const client = await pool.connect();
  try {
    // First check if it's already a favorite
    const checkResult = await client.query(
      'SELECT id FROM user_favorites WHERE user_id = $1 AND course_id = $2',
      [userId, parcoursId]
    );
    
    const isFavorite = checkResult.rows.length > 0;
    
    if (isFavorite) {
      // Remove from favorites
      await client.query(
        'DELETE FROM user_favorites WHERE user_id = $1 AND course_id = $2',
        [userId, parcoursId]
      );
      return { success: true, is_favorite: false };
    } else {
      // Add to favorites
      await client.query(
        'INSERT INTO user_favorites (user_id, course_id) VALUES ($1, $2)',
        [userId, parcoursId]
      );
      return { success: true, is_favorite: true };
    }
  } finally {
    client.release();
  }
}

module.exports = { 
  getParcoursList, 
  getParcoursDetails, 
  generateParcours, 
  getParcoursByUser,
  toggleFavorite,
};
