import React, { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/NavMenuBar";
import Footer from "@/components/footer";

const EditProfile: React.FC = () => {
  // State for user input fields
  const [formData, setFormData] = useState({
    firstName: "Mehrab",
    lastName: "Bozorgi",
    email: "mehrabbozorgi.business@gmail.com",
    address: "33062 Zboncak isle",
    contactNumber: "58077.79",
    city: "Mehrab",
    state: "Bozorgi",
    password: "sbdfbnd65sfdvb s",
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission (Dummy Function)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 px-6">
      <div className="max-w-2xl w-full bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-8 relative">
        <Navbar />
        {/* Profile Picture */}
        <div className="absolute top-4 right-4">
          <img
            src="https://via.placeholder.com/60"
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full px-3 py-2 border rounded-md bg-gray-100"
              disabled
            />
            <Check className="absolute top-10 right-3 text-green-500" size={20} />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            />
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-gray-700">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            >
              <option>Mehrab</option>
              <option>New York</option>
              <option>Los Angeles</option>
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-gray-700">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            >
              <option>Bozorgi</option>
              <option>California</option>
              <option>Texas</option>
            </select>
          </div>

          {/* Password Field */}
          <div className="relative md:col-span-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-white bg-opacity-70"
            />
            <Check className="absolute top-10 right-3 text-green-500" size={20} />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/bprofile">
            <button className="px-4 py-2 border rounded-md text-white bg-red-500 hover:bg-red-600">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
