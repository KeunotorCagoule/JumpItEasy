-- SQL script to create necessary tables

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parcours table
CREATE TABLE parcours (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  difficulty VARCHAR(50) DEFAULT 'Beginner',
  course_type VARCHAR(10) DEFAULT '1',
  water_elements BOOLEAN DEFAULT FALSE,
  private BOOLEAN DEFAULT FALSE,
  course_layout JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
