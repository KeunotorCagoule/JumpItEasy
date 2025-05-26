import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import { RegisterFormData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { API_URL } from "../../config/api";

const Register: React.FC = () => {
  const { t } = useLanguage(); // Added translation hook
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  // Redirect to home if already logged in
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          country: data.country,
          language: data.language, // Include language preference
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || t("auth.register.failed"));
      }

      // Stocker le token JWT dans localStorage
      localStorage.setItem("token", responseData.token);

      // Créer un objet user complet avec toutes les informations nécessaires
      const userData = {
        id: responseData.user.id,
        username: responseData.user.username,
        email: responseData.user.email,
        language: responseData.user.language,
      };

      // Par défaut, stockons les données utilisateur dans sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));

      // Connecter l'utilisateur avec l'objet utilisateur complet
      login(responseData.user.username, responseData.user.language || 'en', userData);

      navigate("/");
    } catch (error: unknown) {
      console.error(
        "Erreur d'inscription:",
        error instanceof Error ? error.message : "Unknown error"
      );
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
    </>
  );
};

export default Register;
