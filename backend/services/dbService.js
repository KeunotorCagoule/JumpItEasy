const { Pool } = require('pg');

require('dotenv').config();

// Build connection options with better error handling
const getConnectionConfig = () => {
  // Check if DATABASE_URL is provided
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };
  }
  
  // Fallback to individual connection parameters
  return {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
  };
};

const pool = new Pool(getConnectionConfig());

function connectDB() {
  pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => {
      console.error('Database connection error', err.stack);
      console.log('Check your database connection parameters in .env file');
      if (process.env.NODE_ENV !== 'production') {
        console.log('Current connection config:', JSON.stringify(getConnectionConfig(), null, 2).replace(/"password":"[^"]*"/, '"password":"[HIDDEN]"'));
      }
    });
}

module.exports = { pool, connectDB };
