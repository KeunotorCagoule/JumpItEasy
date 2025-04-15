import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
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
        setUsername(payload.username || "User");
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setUsername(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
