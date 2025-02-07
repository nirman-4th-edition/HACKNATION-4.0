import { useState } from "react";
import "../styles/login.css";

import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  Card,
  Title,
  PasswordInput,
  Alert,
} from "@mantine/core";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", email, password);
    setError(null); // Reset error on new attempt

    try {
      const userData = await loginUser({
        email: email,
        password: password,
      });

      if (!userData || !userData.token) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      login(userData);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <Card shadow="lg" padding="xl" radius="md" className="login-card">
        <Title align="center" order={2} className="login-title">
          Login to Your Account
        </Title>

        {error && (
          <Alert color="red" title="Error" className="error-alert">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            className="login-input"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <PasswordInput
            className="login-input"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <Button type="submit" fullWidth className="login-button">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
