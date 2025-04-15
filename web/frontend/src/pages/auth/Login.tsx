import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import { LoginFormData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
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
        throw new Error(responseData.message || "Login failed");
      }

      // Store JWT token in localStorage
      localStorage.setItem("token", responseData.token);

      // Store user data in localStorage if remember me is checked
      if (data.rememberMe) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            identifier: data.usernameOrEmail,
          })
        );
      } else {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            identifier: data.usernameOrEmail,
          })
        );
      }

      // Decode the token to get the username
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

      login(username);
      navigate("/", { replace: true });
    } catch (error: any) {
      console.error("Login error:", error.message);
      // Handle error (e.g., display error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
};

export default Login;
