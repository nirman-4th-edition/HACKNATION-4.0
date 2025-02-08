import { useState, useEffect } from "react";
import axios from "axios";

const Grades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/grades");
        setGrades(response.data.grades);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="container">
      <h1>Quiz Grades</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score</th>
            <th>Total</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.student_name}</td>
              <td>{grade.score}</td>
              <td>{grade.total}</td>
              <td>{new Date(grade.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;
