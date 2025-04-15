const { pool } = require('./dbService');

// Get list of parcours
async function getParcoursList() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM parcours');
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

module.exports = { getParcoursList, getParcoursDetails };
