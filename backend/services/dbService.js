const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.semyoeekrtvvwdbmehlc:P00p*@gencY33@aws-0-eu-west-3.pooler.supabase.com:5432/postgres',
});

function connectDB() {
  pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error', err.stack));
}

module.exports = { pool, connectDB };
