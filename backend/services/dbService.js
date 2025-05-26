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
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    // Add connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection not established
    maxUses: 7500, // Close and replace a client after it has been used 7500 times
  };
};

const pool = new Pool(getConnectionConfig());

// Handle pool errors so they don't crash the application
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client', err.message);
  // Don't terminate the application on connection errors
  if (process.env.NODE_ENV !== 'production') {
    console.log('Database connection error. Attempting to continue...');
  }
});

// Connection validation function
const validateConnection = async (client) => {
  try {
    await client.query('SELECT 1');
    return true;
  } catch (error) {
    return false;
  }
};

// Enhanced query function with retry logic
const executeQuery = async (queryText, params = []) => {
  let client;
  let retries = 3;
  
  while (retries > 0) {
    try {
      client = await pool.connect();
      
      // Validate the connection before executing the query
      const isValid = await validateConnection(client);
      if (!isValid) {
        throw new Error('Invalid connection');
      }
      
      const result = await client.query(queryText, params);
      return result;
    } catch (error) {
      retries--;
      if (retries === 0) {
        throw error;
      }
      console.log(`Query failed, retrying (${3 - retries}/3)...`);
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      if (client) client.release();
    }
  }
};

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

module.exports = { pool, connectDB, executeQuery };
