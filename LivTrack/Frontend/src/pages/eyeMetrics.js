import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, TextInput, Title, LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/cholesterol.css";

const EyeMetrics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [latestReport, setLatestReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    visualAcuity: { rightEye: "", leftEye: "", withCorrection: "" },
    intraocularPressure: { rightEye: "", leftEye: "" },
    pupilReactivity: { rightEye: "", leftEye: "" },
    visualFieldTest: { rightEye: "", leftEye: "" },
    refraction: {
      rightEye: { sphere: "", cylinder: "", axis: "" },
      leftEye: { sphere: "", cylinder: "", axis: "" },
    },
    fundusExamination: { rightEye: "", leftEye: "" },
    testDate: new Date().toISOString().split("T")[0],
    examiner: "",
    additionalNotes: "",
  });

  useEffect(() => {
    const fetchEyeData = async () => {
      try {
        const response = await api.get("/health/eye-metrics", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMetrics(response.data.data.metrics);
        setLatestReport(response.data.data.metrics.slice(-1)[0] || null);
      } catch (error) {
        console.error("Error fetching eye metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEyeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/health/eye-metrics", formData);
      navigate(0);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (loading) return <LoadingOverlay visible={true} />;

  return (
    <div className="metrics-container">
      <Button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back to Dashboard
      </Button>
      <Title order={2} style={{ marginBottom: "2rem" }}>
        Eye Metrics
      </Title>
      <Card shadow="sm" style={{ marginBottom: "2rem" }}>
        <Title order={4} style={{ marginBottom: "1rem" }}>
          Add New Eye Test
        </Title>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData.visualAcuity).map((key) => (
            <TextInput
              key={key}
              label={`Visual Acuity (${key})`}
              value={formData.visualAcuity[key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualAcuity: {
                    ...formData.visualAcuity,
                    [key]: e.target.value,
                  },
                })
              }
              required
              style={{ marginBottom: "1rem" }}
            />
          ))}
          <TextInput
            label="Examiner"
            value={formData.examiner}
            onChange={(e) =>
              setFormData({ ...formData, examiner: e.target.value })
            }
            required
            style={{ marginBottom: "1rem" }}
          />
          <TextInput
            label="Additional Notes"
            value={formData.additionalNotes}
            onChange={(e) =>
              setFormData({ ...formData, additionalNotes: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
      {latestReport ? (
        <div>
          <p>Date: {new Date(latestReport.testDate).toLocaleDateString()}</p>
          <p>Examiner: {latestReport.examiner}</p>
          <p>Visual Acuity (Right Eye): {latestReport.visualAcuity.rightEye}</p>
          <p>Visual Acuity (Left Eye): {latestReport.visualAcuity.leftEye}</p>
          <p>Additional Notes: {latestReport.additionalNotes}</p>
        </div>
      ) : (
        <p>No reports available</p>
      )}
    </div>
  );
};

export default EyeMetrics;
