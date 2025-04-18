const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const parcoursRoutes = require('./routes/parcours');
const userRoutes = require('./routes/users'); // Ajout des routes utilisateur
const { connectDB } = require('./services/dbService');

const app = express();
const PORT = 3000;

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/parcours', parcoursRoutes);
app.use('/users', userRoutes); // Enregistrement des routes utilisateur

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
