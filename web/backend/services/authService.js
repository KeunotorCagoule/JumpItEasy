const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('./dbService');

const SECRET_KEY = 'f98f9837eae3ac2120530f2490e9af7171e6a3b1fadf2c8270340406143bd7601a9ca20159f9d83f95aca03f3238e47778110be0410201521a773312b52bf8c217e91f7b1bc10452c32039487539a327871ed6ecd08aa981115eef62df2f2d72cae35d35724e9b8eb2a93b1cb5ba677f6e86bbfb6a1868d38f105342ecb22f439d56e9ebe04ab2a2b46084c4eb02d48708e918501e289e53ce13080aa5269afbc39a142ec91586a7f0bf5902bdd3a4ba5352462db81d10ff1db26ed1cce1ace2541524abfcb962bed84ee9da0d4ccc711912ede30d37784c283401cec9dc58a9e444f2af0d1722872b94e2505f031d7c7fa0dd9247369e7a045a6c77834038b0';

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
    return insertResult.rows[0];
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
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { register, login, verifyToken };
