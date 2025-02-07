import React, { useState } from "react";
import "./CheckAppointments.css";

const initialAppointments = [
  { id: 1, name: "John Doe", age: 30, concern: "Fever", date: "2025-02-10", time: "10:00 AM" },
  { id: 2, name: "Jane Smith", age: 25, concern: "Headache", date: "2025-02-11", time: "02:00 PM" },
  { id: 3, name: "Emily Johnson", age: 40, concern: "Back Pain", date: "2025-02-12", time: "11:30 AM" },
  { id: 4, name: "Michael Brown", age: 35, concern: "Fever", date: "2025-02-13", time: "01:00 PM" }
];

export default function CheckAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filters, setFilters] = useState({ concern: "", date: "", time: "" });

  const handleAccept = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    alert("Appointment Accepted!");
  };

  const handleReject = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    alert("Appointment Rejected!");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    return initialAppointments.filter(
      (appointment) =>
        (filters.concern === "" || appointment.concern === filters.concern) &&
        (filters.date === "" || appointment.date === filters.date) &&
        (filters.time === "" || appointment.time === filters.time)
    );
  };

  return (
    <div className="appointments-container">
      <h2 className="heading-doctor">Doctor's Appointments</h2>
      
      <div className="filter-section">
        <select name="concern" onChange={handleFilterChange}>
          <option value="">All Concerns</option>
          <option value="Fever">Fever</option>
          <option value="Headache">Headache</option>
          <option value="Back Pain">Back Pain</option>
        </select>
        <input type="date" name="date" onChange={handleFilterChange} className="black"/>
        <input type="time" name="time" onChange={handleFilterChange} className="black"/>
        <button onClick={() => setAppointments(applyFilters())} className="filter-btn">Filter</button>
      </div>
      
      <div className="appointments-list">
        {appointments.map(({ id, name, age, concern, date, time }) => (
          <div className="appointment-card" key={id}>
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p className="imp-concern">Concern: {concern}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <div className="actions">
              <button className="accept" onClick={() => handleAccept(id)}>Accept</button>
              <button className="reject" onClick={() => handleReject(id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
