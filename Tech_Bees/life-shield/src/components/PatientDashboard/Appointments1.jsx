import React from "react";
import "./styles.css";

const Appointments1 = () => {
  const appointments = [
    { concern: "General Checkup", doctor: "Dr. Smith", date: "Feb 10", time: "10:00 AM" },
    { concern: "Dental Cleaning", doctor: "Dr. Williams", date: "Feb 15", time: "3:30 PM" },
    { concern: "Eye Checkup", doctor: "Dr. Johnson", date: "Feb 20", time: "2:00 PM" },
  ];

  return (
    <div className="appointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((apt, index) => (
          <li key={index}>
            <strong>{apt.concern}</strong> with {apt.doctor} <br />
            <span>{apt.date} at {apt.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments1;
