-- Tables pour la gestion des utilisateurs, profils et préférences

-- Mettre à jour la table users
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- Table des préférences utilisateur
CREATE TABLE IF NOT EXISTS user_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(10) DEFAULT 'fr',
  dark_mode BOOLEAN DEFAULT FALSE,
  email_notifications BOOLEAN DEFAULT TRUE,
  app_notifications BOOLEAN DEFAULT TRUE,
  marketing_emails BOOLEAN DEFAULT FALSE,
  two_factor_auth BOOLEAN DEFAULT FALSE,
  public_profile BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES parcours(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);

-- Ajouter une colonne creator_id à la table parcours
ALTER TABLE parcours ADD COLUMN IF NOT EXISTS creator_id INTEGER REFERENCES users(id);
ALTER TABLE parcours ADD COLUMN IF NOT EXISTS difficulty VARCHAR(50);

-- Table des parcours complétés
CREATE TABLE IF NOT EXISTS user_completed_courses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES parcours(id) ON DELETE CASCADE,
  completion_rate INTEGER DEFAULT 100,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, course_id)
);
