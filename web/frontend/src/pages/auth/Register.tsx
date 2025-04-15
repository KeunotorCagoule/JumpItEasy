import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm";
import { RegisterFormData } from "../../types/auth";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
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
        throw new Error(responseData.message || "Registration failed");
      }

      // Store JWT token in localStorage
      localStorage.setItem("token", responseData.token);

      // Store user data in sessionStorage
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          username: data.username,
          email: data.email,
        })
      );

      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error.message);
      // Handle error (e.g., display error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />;
};

export default Register;
