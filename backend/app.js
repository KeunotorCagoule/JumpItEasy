const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const parcoursRoutes = require('./routes/parcours');
const userRoutes = require('./routes/users');
const { connectDB } = require('./services/dbService');

const app = express();

// Connexion à la base de données (à éviter dans les tests si elle est réelle)
connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/parcours', parcoursRoutes);
app.use('/users', userRoutes);

module.exports = app;

