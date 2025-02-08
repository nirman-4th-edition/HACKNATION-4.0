import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { fetchMetrics } from "../services/metrics";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../styles/dashBoard.css";
import bloodImg from "./logos/blood1.jpg";
import cholesterolImg from "./logos/cholesterol.png";
import eyeImg from "./logos/eye.png";
import logo from "./logos/logoLivTrack.png";
import pcosImg from "./logos/pcos.png";

const API_URL = process.env.REACT_APP_API_URL;

const ScannerButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected File:", file);
      // You can process the file here (upload, preview, etc.)
    }
  };

  // Handle camera capture
  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Opens back camera on mobile
    input.onchange = (event) => handleFileSelect(event);
    input.click();
  };

  return (
    <div>
      {/* Floating Scanner Button */}
      <button className="scanner-button" onClick={() => setShowOptions(true)}>
        📷
      </button>

      {/* Modal for selecting options */}
      {showOptions && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select an Option</h3>
            <button
              onClick={() => document.getElementById("fileInput").click()}
            >
              📁 Choose from Files
            </button>
            <button onClick={handleCameraCapture}>📷 Take a Photo</button>
            <button onClick={() => setShowOptions(false)}>❌ Cancel</button>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* User Info */}
      <div className="dashboard-header">
        <img src={logo} alt="logo" />
        <h1>Welcome to LivTrack</h1> {/* Replace dynamically with user data */}
        <Button onClick={logout} className="logout-button">
          Logout
        </Button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div
          className="dashboard-tile"
          onClick={() => navigate("/cholesterol-metrics")}
        >
          <img src={cholesterolImg} alt="Tile 1" />
          <p>Cholesterol</p>
        </div>
        <div
          className="dashboard-tile"
          onClick={() => navigate("/blood-metrics")}
        >
          <img src={bloodImg} alt="Tile 2" />
          <p>Blood Reports </p>
        </div>
        <div
          className="dashboard-tile"
          onClick={() => navigate("/pcos-metrics")}
        >
          <img src={pcosImg} alt="Tile 3" />
          <p>PCOS</p>
        </div>
        <div
          className="dashboard-tile"
          onClick={() => navigate("/eye-metrics")}
        >
          <img src={eyeImg} alt="Tile 4" />
          <p>EYE</p>
        </div>
      </div>

      {/* Scanner Button */}
      <ScannerButton />

      {/* Bottom Navigation Bar */}
      <div className="bottom-navbar">
        <button onClick={() => navigate("/home")}>🏠 Home</button>
        <button onClick={() => navigate("/Profile")}>👤 Profile</button>
        <button onClick={() => navigate("/reports")}>📄 Reports</button>
        <button onClick={() => navigate("/setting")}>⚙️ Settings</button>
      </div>
    </div>
  );
}
