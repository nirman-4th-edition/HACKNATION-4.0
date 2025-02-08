import React, { useState } from "react";
import "./style.css";

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    specialty: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    qualifications: "",
    licenseNo: "",
    bio: "",
    feedback: "",
    review: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.doctorName) newErrors.doctorName = "Please enter the doctor's name";
    if (!formData.specialty) newErrors.specialty = "Please enter the doctor's specialization";
    if (!formData.email.match(/\S+@\S+\.\S+/)) newErrors.email = "Please enter a valid email address";
    if (!formData.phone.match(/\d{10}/)) newErrors.phone = "Please enter a valid phone number";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.department) newErrors.department = "Please enter department";
    if (!formData.qualifications) newErrors.qualifications = "Please enter qualifications";
    if (!formData.licenseNo) newErrors.licenseNo = "Please enter license number";
    if (!formData.bio) newErrors.bio = "Please enter the biography";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (validateForm()) {
      setSuccessMessage("Profile submitted successfully!");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Doctor Profile Form</h2>
        <p>Please fill in the details below to create a doctor profile</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-half">
            <label>Doctor's Name</label>
            <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} />
            {errors.doctorName && <div className="error-message">{errors.doctorName}</div>}
          </div>
          <div className="col-half">
            <label>Specialization</label>
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
            {errors.specialty && <div className="error-message">{errors.specialty}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-half">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="col-half">
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-half">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </div>
          <div className="col-half">
            <label>Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} />
            {errors.department && <div className="error-message">{errors.department}</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-half">
            <label>Qualifications</label>
            <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} />
            {errors.qualifications && <div className="error-message">{errors.qualifications}</div>}
          </div>
          <div className="col-half">
            <label>License Number</label>
            <input type="text" name="licenseNo" value={formData.licenseNo} onChange={handleChange} />
            {errors.licenseNo && <div className="error-message">{errors.licenseNo}</div>}
          </div>
        </div>

        <label>Profile Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} />

        <label>Brief Biography</label>
        <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange}></textarea>
        {errors.bio && <div className="error-message">{errors.bio}</div>}

        <label>Patient Feedback</label>
        <textarea name="feedback" rows="4" value={formData.feedback} onChange={handleChange}></textarea>

        <label>Doctor's Review</label>
        <textarea name="review" rows="4" value={formData.review} onChange={handleChange}></textarea>

        <div className="text-center">
          <button type="submit" className="btn-primary">Submit Profile</button>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default DoctorProfile;
