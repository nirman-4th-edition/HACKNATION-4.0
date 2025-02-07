import React, { useState } from "react";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    concern: "",
    date: "",
    time: "",
    description: "",
    pastmedical: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Booked Successfully!");
    console.log(formData);
  };

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">📅 Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="concern"
          placeholder="Concern"
          value={formData.concern}
          onChange={handleChange}
          required
        />
        
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="dob-input"
          required
        />
        
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="dob-input"
          required
        />
        
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
     
        <textarea
          name="pastmedical"
          placeholder="Past Medical History"
          value={formData.pastmedical}
          onChange={handleChange}
          required
          className="full-width-textarea"
        ></textarea>
        
        <button type="submit" className="book-btn">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
