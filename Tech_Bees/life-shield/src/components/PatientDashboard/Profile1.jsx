import React, { useState } from "react";
import "./Profile1.css";

const Profile1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    email: "",
    bloodGroup: "",
    gender:"",
    height: "",
    weight: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">🩺 Patient Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="date" name="dob" placeholder="D.O.B" onChange={handleChange} className="dob-input" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <select name="bloodGroup" onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile1;
