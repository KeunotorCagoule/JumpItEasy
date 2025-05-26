const { pool } = require('./dbService');

// Get list of parcours with optional favorite status
async function getParcoursList(userId = null, includeFavorites = false) {
  const client = await pool.connect();
  try {
    let query = `SELECT p.*, u.username 
                 FROM parcours p 
                 LEFT JOIN users u ON p.creator_id = u.id 
                 WHERE p.private = false`;
      if (includeFavorites && userId) {
      // First, get all public parcours with creator username
      const parcoursResult = await client.query(query);
      
      // Then, get all favorites for this user
      const favoritesResult = await client.query(
        'SELECT course_id FROM user_favorites WHERE user_id = $1',
        [userId]
      );
      
      // Get all completion statuses for this user
      const completionsResult = await client.query(
        'SELECT course_id, completion_rate, completed_at FROM user_completed_courses WHERE user_id = $1',
        [userId]
      );
      
      // Create a set of favorite course IDs for fast lookup
      const favoriteIds = new Set(favoritesResult.rows.map(row => row.course_id));
      
      // Create a map of completion statuses for fast lookup
      const completionMap = new Map();
      completionsResult.rows.forEach(row => {
        completionMap.set(row.course_id, {
          completion_rate: row.completion_rate,
          completed_at: row.completed_at,
          is_completed: true
        });
      });
      
      // Mark parcours as favorite and include completion status
      const parcours = parcoursResult.rows.map(parcours => {
        const completion = completionMap.get(parcours.id) || {
          completion_rate: 0,
          completed_at: null,
          is_completed: false
        };
        
        return {
          ...parcours,
          is_favorite: favoriteIds.has(parcours.id),
          ...completion
        };
      });
      
      console.log(`Fetched ${parcours.length} parcours with ${favoriteIds.size} favorites and completion data for user ${userId}`);
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
      isPrivate,
      course_layout
    } = parcoursData;    // Insert the new parcours with simplified fields
    const result = await client.query(
      `INSERT INTO parcours 
       (title, description, difficulty, water_elements, course_type, private, creator_id, course_layout, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [
        title,
        description,
        difficulty,
        water,
        courseType,
        isPrivate,
        userId,
        course_layout || null
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
    // Get all parcours created by the user, with creator username
    const result = await client.query(`
      SELECT p.*, u.username,
             CASE WHEN uc.completion_rate IS NOT NULL THEN uc.completion_rate ELSE NULL END as completion_rate,
             CASE WHEN uf.id IS NOT NULL THEN true ELSE false END as is_favorite
      FROM parcours p
      LEFT JOIN users u ON p.creator_id = u.id
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

async function getParcoursDetails(id, userId = null) {
  const client = await pool.connect();
  try {
    // Get parcours details with creator username
    const result = await client.query(`
      SELECT p.*, u.username 
      FROM parcours p 
      LEFT JOIN users u ON p.creator_id = u.id 
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      throw new Error('Parcours not found');
    }    let parcours = result.rows[0];
    
    // course_layout is already parsed by PostgreSQL when using JSON column type
    // No need to JSON.parse() as it's already an object
    if (parcours.course_layout) {
      console.log('Course layout found:', typeof parcours.course_layout, parcours.course_layout);
    }

    console.log(parcours);

    // If user is logged in, check if it's a favorite and get completion status
    if (userId) {
      const favoriteResult = await client.query(
        'SELECT id FROM user_favorites WHERE user_id = $1 AND course_id = $2',
        [userId, id]
      );
      parcours.is_favorite = favoriteResult.rows.length > 0;
      
      // Get completion status
      const completionResult = await client.query(
        'SELECT completion_rate, completed_at FROM user_completed_courses WHERE user_id = $1 AND course_id = $2',
        [userId, id]
      );
      
      if (completionResult.rows.length > 0) {
        parcours.is_completed = true;
        parcours.completion_rate = completionResult.rows[0].completion_rate;
        parcours.completed_at = completionResult.rows[0].completed_at;
      } else {
        parcours.is_completed = false;
        parcours.completion_rate = 0;
        parcours.completed_at = null;
      }
    } else {
      parcours.is_favorite = false;
      parcours.is_completed = false;
      parcours.completion_rate = 0;
      parcours.completed_at = null;
    }

    return parcours;
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

// Delete a parcours (only by creator)
async function deleteParcours(parcoursId, userId) {
  const client = await pool.connect();
  try {
    // First check if the parcours exists and if the user is the creator
    const checkResult = await client.query(
      'SELECT id, creator_id, title FROM parcours WHERE id = $1',
      [parcoursId]
    );

    if (checkResult.rows.length === 0) {
      throw new Error('Parcours not found');
    }

    const parcours = checkResult.rows[0];

    // Verify that the user is the creator
    if (parcours.creator_id !== userId) {
      const error = new Error('Unauthorized: Only the creator can delete this parcours');
      error.statusCode = 403;
      throw error;
    }

    // Begin transaction to delete all related data
    await client.query('BEGIN');

    try {
      // Delete related records first (to maintain referential integrity)
      await client.query('DELETE FROM user_favorites WHERE course_id = $1', [parcoursId]);
      await client.query('DELETE FROM user_completed_courses WHERE course_id = $1', [parcoursId]);
      
      // Delete the parcours itself
      const deleteResult = await client.query(
        'DELETE FROM parcours WHERE id = $1 RETURNING *',
        [parcoursId]
      );

      await client.query('COMMIT');
      
      return {
        success: true,
        deletedParcours: deleteResult.rows[0]
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }  } finally {
    client.release();
  }
}

// Mark a course as completed
async function markCourseCompleted(courseId, userId, completionRate = 100) {
  const client = await pool.connect();
  try {
    // Check if the course exists
    const courseResult = await client.query(
      'SELECT id FROM parcours WHERE id = $1',
      [courseId]
    );
    
    if (courseResult.rows.length === 0) {
      throw new Error('Course not found');
    }
    
    // Check if completion already exists
    const existingResult = await client.query(
      'SELECT id, completion_rate FROM user_completed_courses WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    
    if (existingResult.rows.length > 0) {
      // Update existing completion
      const updateResult = await client.query(
        'UPDATE user_completed_courses SET completion_rate = $1, completed_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND course_id = $3 RETURNING *',
        [completionRate, userId, courseId]
      );
      
      return {
        success: true,
        message: 'Course completion updated',
        completion: updateResult.rows[0],
        updated: true
      };
    } else {
      // Insert new completion
      const insertResult = await client.query(
        'INSERT INTO user_completed_courses (user_id, course_id, completion_rate) VALUES ($1, $2, $3) RETURNING *',
        [userId, courseId, completionRate]
      );
      
      return {
        success: true,
        message: 'Course marked as completed',
        completion: insertResult.rows[0],
        updated: false
      };
    }
  } finally {
    client.release();
  }
}

// Get course completion status for a user
async function getCourseCompletionStatus(courseId, userId) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM user_completed_courses WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    
    if (result.rows.length === 0) {
      return {
        completed: false,
        completion_rate: 0,
        completed_at: null
      };
    }
    
    const completion = result.rows[0];
    return {
      completed: true,
      completion_rate: completion.completion_rate,
      completed_at: completion.completed_at,
      id: completion.id
    };
  } finally {
    client.release();
  }
}

// Save a generated course with layout
async function saveGeneratedCourse(parcoursData, userId) {
  const client = await pool.connect();
  try {
    const { 
      title, 
      description, 
      difficulty, 
      water,
      courseType,
      isPrivate,
      course_layout
    } = parcoursData;    // Insert the new parcours with course layout
    const result = await client.query(
      `INSERT INTO parcours 
       (title, description, difficulty, water_elements, course_type, private, creator_id, course_layout, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [
        title,
        description,
        difficulty,
        water,
        courseType,
        isPrivate,
        userId,
        course_layout || null
      ]
    );    const savedParcours = result.rows[0];
    
    // course_layout is already parsed by PostgreSQL when using JSON column type
    // No need to JSON.parse() as it's already an object
    console.log('Saved course layout:', typeof savedParcours.course_layout, savedParcours.course_layout);

    return savedParcours;
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
  deleteParcours,
  markCourseCompleted,
  getCourseCompletionStatus,
  saveGeneratedCourse,
};
