import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import { LoginFormData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext"; // Added import

const Login: React.FC = () => {
  const { t } = useLanguage(); // Added translation hook
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // Redirect to home if already logged in
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.usernameOrEmail,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || t("auth.login.invalidCredentials"));
      }

      // Store JWT token in localStorage
      localStorage.setItem("token", responseData.token);

      // Decode the token to get the username and user ID
      const base64Url = responseData.token.split(".")[1];
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
      const username = payload.username || data.usernameOrEmail;
      const userId = payload.id || "1";

      // Store user data with more complete information
      const userData = {
        id: userId,
        username: username,
        identifier: data.usernameOrEmail
      };

      // Store user data in localStorage if remember me is checked, or sessionStorage if not
      if (data.rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      login(username);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Login error:", error.message);
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} authError={authError} />;
};

export default Login;
