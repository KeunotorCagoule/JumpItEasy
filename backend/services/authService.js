const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('./dbService');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Register a new user
async function register({ username, email, password }) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const user = insertResult.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    return { user, token };
  } finally {
    client.release();
  }
}

// Login a user and generate a token
async function login({ identifier, password }) {
  const client = await pool.connect();
  try {
    console.log(identifier + " " + password);
    const result = await client.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    if (result.rows.length === 0) {
      throw new Error('Invalid username/email or password');
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username/email or password');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  } finally {
    client.release();
  }
}

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { register, login, verifyToken };
