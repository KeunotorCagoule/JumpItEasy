import { UserProfile, UserSettings, PasswordChangeRequest, AuthUser } from '../types/user';
import { Parcours } from '../types/parcours';
import { API_URL } from '../config/api';
import { isTokenExpired } from '../utils/tokenUtils';

// Ajout de cette ligne pour résoudre le problème RequestInit
type RequestInit = globalThis.RequestInit;

// Fonction utilitaire pour les requêtes authentifiées
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No authentication token available');
  }

  // Vérifier si le token est expiré avant d'envoyer la requête
  if (isTokenExpired(token)) {
    // Déclencher un événement pour informer l'application que le token a expiré
    window.dispatchEvent(new CustomEvent('token-expired'));
    throw new Error('Authentication token has expired. Please log in again.');
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

  // Vérifier si la réponse indique une erreur d'authentification (token expiré)
  if (response.status === 401) {
    // Déclencher un événement pour informer l'application que le token a expiré
    window.dispatchEvent(new CustomEvent('token-expired'));
    throw new Error('Authentication failed. Your session may have expired.');
  }

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
export const getUserRecentCourses = async (): Promise<Parcours[]> => {
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
  console.log('Deleting account...');
  return authFetch(`${API_URL}/users/account`, {
    method: 'DELETE'
  });
}

export const updateLanguagePreference = async (language: string): Promise<{ success: boolean, message: string }> => {
  return authFetch(`${API_URL}/users/language`, {
    method: 'PUT',
    body: JSON.stringify({ language })
  });
}

// Récupérer les informations de l'utilisateur connecté
export const getCurrentUser = async (): Promise<AuthUser> => {
  return authFetch(`${API_URL}/auth/me`);
};
