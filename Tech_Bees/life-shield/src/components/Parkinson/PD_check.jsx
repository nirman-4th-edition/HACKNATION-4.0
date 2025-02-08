import "./PD_check.css";
import { useNavigate } from "react-router-dom";

export default function PD_check() {
  const navigate = useNavigate();
  return (
    <div className="check-prediction">
      <h2>Check Your Parkinson’s Disease Prediction</h2>
      <p>
        Use our prediction tool to assess your risk of Parkinson’s Disease.
        Early detection can save lives.
      </p>
      <button className="prediction-btn" onClick={() => navigate("/pd-check")}>
        Check Now
      </button>
    </div>
  );
}
