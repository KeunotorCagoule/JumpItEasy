const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool, executeQuery } = require('./dbService');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Register a new user
async function register({ username, email, password, country, language = 'fr' }) {
  const client = await pool.connect();
  try {
    // Check if the connection is valid
    await client.query('SELECT 1');
    
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await client.query(
      'INSERT INTO users (username, email, password, country, language) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, country, language',
      [username, email, hashedPassword, country, language]
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
  try {
    console.log(identifier + " " + password);
    const result = await executeQuery('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    
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
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
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

// Middleware pour vérifier le token de manière optionnelle
const optionalToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    // Pas de token, continuez sans données utilisateur
    return next();
  }

  try {
    // Vérifier le token avec la même variable que pour verifyToken
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Ajouter les données utilisateur à la requête
    next();
  } catch (error) {
    // Token invalide, continuez sans données utilisateur
    console.log('Optional auth: Invalid token, continuing without user:', error.message);
    next();
  }
};

module.exports = { register, login, verifyToken, optionalToken };
