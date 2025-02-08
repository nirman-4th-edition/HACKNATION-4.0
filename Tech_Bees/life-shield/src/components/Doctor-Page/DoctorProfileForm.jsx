import { useState } from "react";
import "./DoctorProfileForm.css"
const DoctorProfileForm = () => {
  const [formData, setFormData] = useState({
    DoctorName: "",
    Specialty: "",
    Email: "",
    PageTransitionEventhone: "",
    Gender: "",
    Department: "",
    Qualifications: "",
    LicenseNo: "",
    Bio: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!/\d{10}/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("Profile submitted successfully!");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="Doctor-container-1">
      <div className="header">
        <h2>Doctor Profile Form</h2>
        <p>Please fill in the details below to create a doctor profile</p>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").trim()}</label>
            <input
              type={key === "email" ? "email" : "text"}
              id={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
            />
            {errors[key] && <span className="error-message">{errors[key]}</span>}
          </div>
        ))}
        <div className="form-group submit-btn-div">
          <button type="submit" className="btn-submit">Submit Profile</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default DoctorProfileForm;
