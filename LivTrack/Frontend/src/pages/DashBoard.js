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
import ScannerButton from "../components/ScannerButton";
import pcosImg from "./logos/pcos.png";
import api from "../services/api";

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
          <img src={bloodImg} id="blood" alt="Tile 2" />
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
        <button onClick={() => navigate("/hospital-details")}>
          🏨 Hospital
        </button>
        <button onClick={() => navigate("/setting")}>⚙️ Settings</button>
      </div>
    </div>
  );
}
