import { useEffect, useState } from "react";
import "./styles2.css";
import axios from "axios";
import { NODE_BACKEND_URL } from "../../redux/store";
import { Link } from "react-router-dom";

const Appointments2 = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${NODE_BACKEND_URL}/doctor/appointments`,
        {
          withCredentials: true,
        }
      );

      const modifiedData = data.appointments.map((apt) => ({
        specialist: apt.specialization,
        patient: apt.patient.name,
        date: new Date(apt.date).toDateString(),
        time: new Date(apt.date).toLocaleTimeString(),
        roomId: apt.roomId.roomLink,
      }));

      setAppointments(modifiedData);
    } catch (error) {
      console.error(error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) return null;

  return (
    <div className="appointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.length === 0 ? (
          <li style={{ textAlign: "center" }}>No appointments</li>
        ) : (
          appointments.map((apt, index) => (
            <li key={index}>
              <strong>{apt.concern}</strong> with {apt.patient} <br />
              <span>
                {apt.date} at {apt.time}
              </span>
              <span>
                <Link to={`/video-call/${apt.roomId}`}>Join Room</Link>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Appointments2;
