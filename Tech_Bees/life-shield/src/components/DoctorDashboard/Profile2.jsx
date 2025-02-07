import React, { useState } from "react";
import "./Profile2.css";

const Profile2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    email: "",
    specialization:"",
    gender:"",
    department: "",
    licence: "",
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
      <h2 className="profile-title">🩺 Doctor Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
        <input type="date" name="dob" placeholder="D.O.B" onChange={handleChange} className="dob-input" required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="licence" placeholder="Licence Number" onChange={handleChange} required />
        <button type="submit" className="update-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile2;
