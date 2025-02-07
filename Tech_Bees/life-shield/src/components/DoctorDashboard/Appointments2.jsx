import React from "react";
import "./styles2.css";

const Appointments2 = () => {
  const appointments = [
    { concern: "General Checkup", patient: "Smith Johnson", date: "Feb 10", time: "10:00 AM" },
    { concern: "Dental Cleaning", patient: "Bravo", date: "Feb 15", time: "3:30 PM" },
    { concern: "Eye Checkup", patient: "Axar Patel", date: "Feb 20", time: "2:00 PM" },
  ];

  return (
    <div className="appointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((apt, index) => (
          <li key={index}>
            <strong>{apt.concern}</strong> with {apt.patient} <br />
            <span>{apt.date} at {apt.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments2;
