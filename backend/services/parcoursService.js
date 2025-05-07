const { pool } = require('./dbService');

// Get list of parcours
async function getParcoursList() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM parcours where private   = false');
    return result.rows;
  } finally {
    client.release();
  }
}

// Get details of a specific parcours
async function getParcoursDetails(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM parcours WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      throw new Error('Parcours not found');
    }
    return result.rows[0];
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

module.exports = { getParcoursList, getParcoursDetails, generateParcours, getParcoursByUser };
