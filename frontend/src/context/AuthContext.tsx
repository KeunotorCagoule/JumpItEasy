/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  decodeJwtToken,
  isTokenExpired,
  getTokenRemainingTime,
} from "../utils/tokenUtils";
import { AuthUser } from "../types/user";

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  user: AuthUser | null;
  language: string | null;
  login: (username: string, language: string, user?: AuthUser) => void;
  logout: () => void;
  tokenExpiresIn: number | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  user: null,
  language: null,
  login: () => {},
  logout: () => {},
  tokenExpiresIn: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [tokenExpiresIn, setTokenExpiresIn] = useState<number | null>(null);
  const { changeLanguage } = useLanguage();

  // Fonction pour déconnecter l'utilisateur
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    setUser(null);
    setLanguage(null);
    setTokenExpiresIn(null);
  }, []);

  // Fonction pour vérifier l'expiration du token
  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (isTokenExpired(token)) {
      console.log("Token expiré, déconnexion automatique");
      logout();
      return;
    }

    // Calcul du temps restant
    const remainingTime = getTokenRemainingTime(token);
    setTokenExpiresIn(remainingTime);

    // Programmation de la prochaine vérification
    // Plus fréquente si proche de l'expiration
    const nextCheckInterval = remainingTime < 300 ? 10000 : 60000; // 10s ou 1min

    const timerId = setTimeout(() => {
      checkTokenExpiration();
    }, nextCheckInterval);

    return () => clearTimeout(timerId);
  }, [logout]);

  useEffect(() => {
    // Check if there's a stored token
    const token = localStorage.getItem("token");

    if (token) {
      // Vérifier d'abord si le token est expiré
      if (isTokenExpired(token)) {
        console.log("Token expiré au chargement, déconnexion automatique");
        logout();
        return;
      }

      try {
        // Check for user in localStorage first (for "remember me")
        let userStr = localStorage.getItem("user");

        // If not found in localStorage, check sessionStorage
        if (!userStr) {
          userStr = sessionStorage.getItem("user");
        }

        if (userStr) {
          const userData = JSON.parse(userStr);

          // Create AuthUser object
          const authUser: AuthUser = {
            id: userData.id || userData.user_id || '',
            username: userData.username || userData.identifier || '',
            email: userData.email || '',
            language: userData.language || ''
          };

          setUser(authUser);
          setUsername(authUser.username);

          // Set language preference if available in the stored user data
          if (authUser.language) {
            setLanguage(authUser.language);
            changeLanguage(authUser.language as any);
          }

          setIsLoggedIn(true);
          checkTokenExpiration();
        } else {
          // If we have a token but no user info, try to decode the token
          try {
            const payload = decodeJwtToken(token);

            if (payload.username && typeof payload.username === 'string') {
              const authUser: AuthUser = {
                id: payload.id || payload.user_id || '',
                username: payload.username,
                email: payload.email || '',
                language: payload.language || ''
              };

              setUser(authUser);
              setUsername(authUser.username);
              setIsLoggedIn(true);

              // Check for language in the token payload
              if (authUser.language) {
                setLanguage(authUser.language);
                changeLanguage(authUser.language as any);
              }

              checkTokenExpiration();
            }
          } catch (tokenError) {
            console.error("Failed to parse JWT token", tokenError);
            logout();
          }
        }
      } catch (e) {
        console.error("Error parsing stored user data", e);
        logout();
      }
    }
  }, [changeLanguage, logout, checkTokenExpiration]);

  // Écouter les événements d'expiration de token émis par d'autres parties de l'application
  useEffect(() => {
    const handleTokenExpired = () => {
      logout();
    };

    window.addEventListener("token-expired", handleTokenExpired);

    return () => {
      window.removeEventListener("token-expired", handleTokenExpired);
    };
  }, [logout]);

  const login = (name: string, language: string, userData?: AuthUser) => {
    setIsLoggedIn(true);
    setUsername(name);

    if (userData) {
      setUser(userData);
    }

    // Ensure we have a valid language code
    const validLanguage =
      language && (language === "en" || language === "fr") ? language : "en";

    // Set the language in context
    setLanguage(validLanguage);

    // Apply the language change
    changeLanguage(validLanguage as "en" | "fr");

    // Save language preference to localStorage for persistence
    localStorage.setItem("language", validLanguage);

    // Démarrer la vérification périodique du token
    checkTokenExpiration();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        user,
        language,
        login,
        logout,
        tokenExpiresIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
