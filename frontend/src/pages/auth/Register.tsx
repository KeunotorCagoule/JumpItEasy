import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import { RegisterFormData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "L'inscription a échoué");
      }

      // Stocker le token JWT dans localStorage
      localStorage.setItem("token", responseData.token);

      // Stocker les données utilisateur retournées par le backend
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: responseData.user.id,
          username: responseData.user.username,
          email: responseData.user.email,
        })
      );

      // Connecter l'utilisateur
      login(responseData.user.username);

      navigate("/");
    } catch (error: any) {
      console.error("Erreur d'inscription:", error.message);
      setError(error.message);
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
