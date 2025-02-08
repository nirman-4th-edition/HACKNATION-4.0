import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

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
    animation: "modalFadeIn 0.3s ease-out",
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
    transition: "color 0.3s ease",
  },
  "@keyframes modalFadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "58vh",
    backgroundColor: "#f5f5f5",
    padding: "10px",
  },
  formsContainer: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
  },
  formBox: {
    flex: 1,
    backgroundColor: "white",
    padding: "0.5rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },

  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "1.5rem",
    fontFamily: "Yatra One",
  },
  formGroup: {
    marginBottom: "0.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
    fontWeight: "600",
    fontFamily: "Almendra",
  },
  input: {
    width: "95%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
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
    transition: "background-color 0.3s ease",
  },
  errorMessage: {
    backgroundColor: "#fff3f3",
    color: "#dc3545",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    textAlign: "center",
    border: "1px solid #ffcdd2",
  },
  toggleText: {
    textAlign: "center",
    marginTop: "1rem",
    color: "#666",
  },
  toggleLink: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "0.5rem",
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
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    // Add event listener for page refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Login attempt with:", loginData);
      localStorage.setItem("userToken", "your-auth-token");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError((prev) => ({ ...prev, login: "Invalid email or password" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!validateAadhar(signupData.Aadhar)) {
      setError((prev) => ({
        ...prev,
        signup: "Please enter a valid 12-digit Aadhar number",
      }));
      return;
    }
    try {
      console.log("Signup attempt with:", signupData);
      navigate("/");
    } catch (err) {
      setError((prev) => ({ ...prev, signup: "Signup failed" }));
    }
  };

  const checkLoginStatus = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("userToken");
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAadhar = (aadhar) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadhar);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={() => navigate("/")}>
          ×
        </button>
        <div style={styles.formsContainer}>
          {isLoginView ? (
            <div style={styles.formBox}>
              <h2 style={styles.heading}>Login</h2>
              {error.login && (
                <div style={styles.errorMessage}>{error.login}</div>
              )}
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    backgroundColor: isLoggedIn || isLoading ? "#cccccc" : "#007bff",
                    cursor: isLoggedIn || isLoading ? "not-allowed" : "pointer",
                  }}
                  disabled={isLoggedIn || isLoading}
                  onMouseOver={(e) =>
                    !isLoggedIn &&
                    !isLoading &&
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    !isLoggedIn &&
                    !isLoading &&
                    (e.target.style.backgroundColor = "#007bff")
                  }
                >
                  {isLoading ? "Loading..." : isLoggedIn ? "Already Logged In" : "Login"}
                </button>
              </form>
              <div style={styles.toggleText}>
                Don't have an account?
                <span style={styles.toggleLink} onClick={() => setIsLoginView(false)}>
                  Sign up
                </span>
              </div>
            </div>
          ) : (
            <div style={styles.formBox}>
              <h2 style={styles.heading}>Sign Up</h2>
              {error.signup && (
                <div style={styles.errorMessage}>{error.signup}</div>
              )}
              <form onSubmit={handleSignupSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  id="password"
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
                  id="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Aadhar"
                  label="Aadhar Number"
                  id="aadhar"
                  value={signupData.Aadhar}
                  onChange={handleSignupChange}
                  inputProps={{
                    maxLength: 12,
                    pattern: "\\d{12}"
                  }}
                  error={signupData.Aadhar && !validateAadhar(signupData.Aadhar)}
                  helperText={
                    signupData.Aadhar && !validateAadhar(signupData.Aadhar)
                      ? "Please enter a valid 12-digit Aadhar number"
                      : ""
                  }
                />
                <button
                  type="submit"
                  style={styles.button}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                >
                  Sign Up
                </button>
              </form>
              <div style={styles.toggleText}>
                Already have an account?
                <span style={styles.toggleLink} onClick={() => setIsLoginView(true)}>
                  Login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };
  
  export default Login;

