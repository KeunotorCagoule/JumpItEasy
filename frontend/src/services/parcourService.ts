import { Course } from '../types/user';
import { API_URL } from '../config/api';

// Ajout de cette ligne pour résoudre le problème RequestInit
type RequestInit = globalThis.RequestInit;

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

// New function for optionally authenticated requests
const optionalAuthFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    } as Record<string, string>;
    
    // Add token only if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
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

export const getParcoursList = async (queryParams: string = ''): Promise<Course[]> => {
    // Always try to send the token if available, even for optional auth routes
    const token = localStorage.getItem('token');
    console.log('=== FRONTEND DEBUG ===');
    console.log('Token exists:', !!token);
    console.log('Query params:', queryParams);
    console.log('====================');
    
    return optionalAuthFetch(`${API_URL}/parcours${queryParams}`);
}

export const getParcoursDetails = async (id: string): Promise<Course> => {
    return authFetch(`${API_URL}/parcours/${id}`);
}

export const generateParcours = async (parcoursData: Partial<Course>): Promise<Course> => {
    return authFetch(`${API_URL}/parcours`, {
        method: 'POST',
        body: JSON.stringify(parcoursData)
    });
}

export const getUserParcours = async (): Promise<Course[]> => {
    return authFetch(`${API_URL}/parcours/user/me`);
}

export const addParcoursToFavorites = async (parcoursId: string): Promise<void> => {
    return authFetch(`${API_URL}/parcours/favorite/${parcoursId}`, {
        method: 'POST'
    });
}