import { UserProfile, Course, UserSettings, PasswordChangeRequest } from '../types/user';
import { API_URL } from '../config/api';

// Fonction utilitaire pour les requêtes authentifiées
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No authentication token available');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }

  return response.json();
};

// Récupérer le profil utilisateur
export const getUserProfile = async (): Promise<UserProfile> => {
  return authFetch(`${API_URL}/users/profile`);
};

// Récupérer les parcours récents de l'utilisateur
export const getUserRecentCourses = async (): Promise<Course[]> => {
  return authFetch(`${API_URL}/users/courses/recent`);
};

// Mettre à jour le profil utilisateur
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  return authFetch(`${API_URL}/users/profile`, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};

// Récupérer les paramètres utilisateur
export const getUserSettings = async (): Promise<UserSettings> => {
  return authFetch(`${API_URL}/users/settings`);
};

// Mettre à jour les paramètres utilisateur
export const updateUserSettings = async (settingsData: Partial<UserSettings>): Promise<UserSettings> => {
  return authFetch(`${API_URL}/users/settings`, {
    method: 'PUT',
    body: JSON.stringify(settingsData)
  });
};

// Changer le mot de passe
export const changePassword = async (passwordData: PasswordChangeRequest): Promise<{ success: boolean, message: string }> => {
  return authFetch(`${API_URL}/users/change-password`, {
    method: 'POST',
    body: JSON.stringify(passwordData)
  });
};

export const deleteAccount = async (): Promise<{ success: boolean, message: string }> => {
  return authFetch(`${API_URL}/users/delete-account`, {
    method: 'DELETE'
  });
}

export const updateLanguagePreference = async (language: string): Promise<{ success: boolean, message: string }> => {
  return authFetch(`${API_URL}/users/language`, {
    method: 'PUT',
    body: JSON.stringify({ language })
  });
}
