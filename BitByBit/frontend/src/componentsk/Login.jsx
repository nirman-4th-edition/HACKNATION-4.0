import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/users"; // Backend API URL

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "500px",
    margin: "5px",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "red",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
  },
};

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ login: "", signup: "" });
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // ✅ Connect MetaMask Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it.");
    }
  };

  // ✅ Check if User is Already Logged In
  const checkLoginStatus = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  };

  // ✅ Handle Login Form Input Change
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Signup Form Input Change
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // ✅ Login API Request
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      console.log(res);
      localStorage.setItem("userToken", res.data.data.accessToken);
      localStorage.setItem("ethAddress", res.data.data.user.ethAddress);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/"); // Navigate after UI updates
      }, 500);
      setIsLoggedIn(true);
      console.log("Successfull");
    } catch (err) {
      setError({
        ...error,
        login: err.response?.data?.message || "Login failed",
      });
      setIsLoading(false);
    }
  };

  // ✅ Signup API Request
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      setError({
        ...error,
        signup: "Please connect MetaMask before signing up",
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError({ ...error, signup: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_URL}/register`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        ethAddress: walletAddress,
      });

      // localStorage.setItem("userToken", res.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setError({
        ...error,
        signup: err.response?.data?.message || "Signup failed",
      });
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={() => navigate("/")}>
          ×
        </button>
        <div>
          {isLoginView ? (
            // 🔵 LOGIN FORM
            <div>
              <h2>Login</h2>
              {error.login && <div style={{ color: "red" }}>{error.login}</div>}
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </form>
              <div>
                Don't have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setIsLoginView(false)}
                >
                  Sign up
                </span>
              </div>
            </div>
          ) : (
            // 🟢 SIGNUP FORM
            <div>
              <h2>Sign Up</h2>
              {error.signup && (
                <div style={{ color: "red" }}>{error.signup}</div>
              )}
              <form onSubmit={handleSignupSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                />
                {walletAddress ? (
                  <p>Connected Wallet: {walletAddress}</p>
                ) : (
                  <button
                    type="button"
                    style={styles.button}
                    onClick={connectWallet}
                  >
                    Connect with MetaMask
                  </button>
                )}
                <button
                  type="submit"
                  style={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
