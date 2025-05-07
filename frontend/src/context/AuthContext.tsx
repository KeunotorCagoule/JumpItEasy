import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a stored token
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Check for user in localStorage first (for "remember me")
        let userStr = localStorage.getItem('user');
        
        // If not found in localStorage, check sessionStorage
        if (!userStr) {
          userStr = sessionStorage.getItem('user');
        }
        
        if (userStr) {
          const user = JSON.parse(userStr);
          
          // Set username from user object (handling both possible structures)
          if (user.username) {
            setUsername(user.username);
          } else if (user.identifier) {
            setUsername(user.identifier);
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
            }
          } catch (tokenError) {
            console.error('Failed to parse JWT token', tokenError);
            logout(); // Invalid token, log out the user
          }
        }
      } catch (e) {
        console.error('Error parsing stored user data', e);
        logout(); // Something went wrong, log out the user
      }
    }
  }, []);

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
