import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  language: string | null;
  login: (username: string, language: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  language: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const { changeLanguage } = useLanguage();
  

  useEffect(() => {
    // Check if there's a stored token
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Check for user in localStorage first (for "remember me")
        let userStr = localStorage.getItem("user");

        // If not found in localStorage, check sessionStorage
        if (!userStr) {
          userStr = sessionStorage.getItem("user");
        }

        if (userStr) {
          const user = JSON.parse(userStr);

          // Set username from user object (handling both possible structures)
          if (user.username) {
            setUsername(user.username);
          } else if (user.identifier) {
            setUsername(user.identifier);
          }

          // Set language preference if available in the stored user data
          if (user.language) {
            setLanguage(user.language);
            changeLanguage(user.language as any); // Apply the language change
          }

          setIsLoggedIn(true);
        } else {
          // If we have a token but no user info, try to decode the token
          try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );

            const payload = JSON.parse(jsonPayload);
            if (payload.username) {
              setUsername(payload.username);
              setIsLoggedIn(true);
              
              // Check for language in the token payload
              if (payload.language) {
                setLanguage(payload.language);
                changeLanguage(payload.language as any);
              }
            }
          } catch (tokenError) {
            console.error("Failed to parse JWT token", tokenError);
            logout(); // Invalid token, log out the user
          }
        }
      } catch (e) {
        console.error("Error parsing stored user data", e);
        logout(); // Something went wrong, log out the user
      }
    }
  }, [changeLanguage]); // Add changeLanguage to dependencies

  const login = (name: string, language: string) => {
    setIsLoggedIn(true);
    setUsername(name);
    
    // Ensure we have a valid language code
    const validLanguage = language && (language === 'en' || language === 'fr') ? language : 'en';
    
    // Set the language in context
    setLanguage(validLanguage);
    
    // Apply the language change
    changeLanguage(validLanguage as 'en' | 'fr');
    
    // Save language preference to localStorage for persistence
    localStorage.setItem('language', validLanguage);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername(null);
    setLanguage(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, language, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
