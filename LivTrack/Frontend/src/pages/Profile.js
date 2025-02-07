import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import profile from "./logos/profile.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser({
          name: response.data.name,
          email: response.data.email,
          age: response.data.age,
          weight: response.data.weight,
          height: response.data.height,
          image: response.data.image || "https://via.placeholder.com/150",
          bio:
            response.data.bio ||
            "Health enthusiast. Focused on living a balanced life.",
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError("Failed to load profile data");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-container error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={profile} alt="logo" className="profile-image" />
        </div>
        <div className="profile-details">
          <h1 className="profile-name">Name:{user.name}</h1>
          <p className="profile-email">Email:{user.email}</p>
          <p className="profile-age">Age:{user.age}</p>
          <p className="profile-weight">Height:{user.weight}</p>
          <p className="profile-height">Weight:{user.height}</p>
          <p className="profile-bio">Bio:{user.bio}</p>
        </div>
      </div>

      <div className="profile-bio">
        <h2>Bio</h2>
        <p>{user.bio}</p>
      </div>

      <div className="profile-actions">
        <button className="btn-edit">Edit Profile</button>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
