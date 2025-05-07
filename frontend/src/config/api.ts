// Configuration de l'API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Configuration pour gérer d'autres paramètres API si nécessaire
export const API_CONFIG = {
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};
