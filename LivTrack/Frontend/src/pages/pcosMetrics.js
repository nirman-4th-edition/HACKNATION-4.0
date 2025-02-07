import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, TextInput, Title, LoadingOverlay } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/cholesterol.css";

const CholesterolMetrics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [latestReport, setLatestReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cholesterolLevels: {
      totalCholesterol: "",
      ldl: "",
      hdl: "",
      triglycerides: "",
      vldl: "",
      nonHdlCholesterol: "",
    },
    units: {
      totalCholesterol: "mg/dL",
      ldl: "mg/dL",
      hdl: "mg/dL",
      triglycerides: "mg/dL",
      vldl: "mg/dL",
      nonHdlCholesterol: "mg/dL",
    },
    referenceRanges: {
      totalCholesterol: "",
      ldl: "",
      hdl: "",
      triglycerides: "",
      vldl: "",
      nonHdlCholesterol: "",
    },
    date: new Date().toISOString().split("T")[0],
    source: "",
    testMethod: "",
    reportGeneratedBy: "",
    reportComments: "",
    testLocation: "",
  });

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await api.get("/health/cholesterol-metrics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const metricsData = response.data.data.metrics;
        setMetrics(
          metricsData.map((metric) => ({
            date: metric.date,
            totalCholesterol: metric.cholesterolLevels.totalCholesterol[0],
            ldl: metric.cholesterolLevels.ldl[0],
            hdl: metric.cholesterolLevels.hdl[0],
            triglycerides: metric.cholesterolLevels.triglycerides[0],
          }))
        );
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);

  useEffect(() => {
    const fetchLatestReport = async () => {
      try {
        const response = await api.get("/health/cholesterol-metrics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const metricsData = response.data.data.metrics;

        // Filter out reports with empty cholesterol data
        const validReports = metricsData.filter(
          (report) => report.cholesterolLevels.totalCholesterol.length > 0
        );

        if (validReports.length > 0) {
          setLatestReport(validReports[validReports.length - 1]); // Pick the latest valid report
        } else {
          setLatestReport(null); // No valid reports found
        }
      } catch (error) {
        console.error("Error fetching latest report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReport();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/health/cholesterol-metrics", formData);
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
        Cholesterol Metrics
      </Title>

      <div className="metrics-content">
        <Card shadow="sm" style={{ marginBottom: "2rem" }}>
          <Title order={4} style={{ marginBottom: "1rem" }}>
            Add New Measurement
          </Title>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData.cholesterolLevels).map((key) => (
              <TextInput
                key={key}
                label={`${key
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase()} (mg/dL)`}
                value={formData.cholesterolLevels[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cholesterolLevels: {
                      ...formData.cholesterolLevels,
                      [key]: e.target.value,
                    },
                  })
                }
                required
                style={{ marginBottom: "1rem" }}
              />
            ))}
            <TextInput
              label="Source"
              value={formData.source}
              onChange={(e) =>
                setFormData({ ...formData, source: e.target.value })
              }
              required
              style={{ marginBottom: "1rem" }}
            />
            <TextInput
              label="Test Method"
              value={formData.testMethod}
              onChange={(e) =>
                setFormData({ ...formData, testMethod: e.target.value })
              }
              required
              style={{ marginBottom: "1rem" }}
            />
            <TextInput
              label="Report Generated By"
              value={formData.reportGeneratedBy}
              onChange={(e) =>
                setFormData({ ...formData, reportGeneratedBy: e.target.value })
              }
              style={{ marginBottom: "1rem" }}
            />
            <TextInput
              label="Comments"
              value={formData.reportComments}
              onChange={(e) =>
                setFormData({ ...formData, reportComments: e.target.value })
              }
              style={{ marginBottom: "1rem" }}
            />
            <TextInput
              label="Test Location"
              value={formData.testLocation}
              onChange={(e) =>
                setFormData({ ...formData, testLocation: e.target.value })
              }
              style={{ marginBottom: "1rem" }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Card>

        {latestReport ? (
          <div>
            <p>Date: {new Date(latestReport.date).toLocaleDateString()}</p>
            <p>
              Total Cholesterol:{" "}
              {latestReport.cholesterolLevels.totalCholesterol[0]} mg/dL
            </p>
            <p>LDL: {latestReport.cholesterolLevels.ldl[0]} mg/dL</p>
            <p>HDL: {latestReport.cholesterolLevels.hdl[0]} mg/dL</p>
            <p>
              Triglycerides: {latestReport.cholesterolLevels.triglycerides[0]}{" "}
              mg/dL
            </p>
            <p>Source: {latestReport.source}</p>
            <p>Comments: {latestReport.reportComments}</p>
          </div>
        ) : (
          <p>No reports available</p>
        )}
        <div className="cholesterol-container">
          <h2 className="cholesterol-title">Cholesterol Levels Over Time</h2>
          <div className="cholesterol-chart">
            <Card shadow="sm" className="graph-card">
              <Title order={4} className="section-title">
                Historical Trends
              </Title>
              <LineChart
                width={600}
                height={300}
                data={metrics}
                className="animated-chart"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalCholesterol"
                  stroke="#8884d8"
                  name="Total Cholesterol (mg/dL)"
                  className="total-cholesterol-line"
                />
                <Line
                  type="monotone"
                  dataKey="ldl"
                  stroke="#82ca9d"
                  name="LDL (mg/dL)"
                  className="ldl-line"
                />
                <Line
                  type="monotone"
                  dataKey="hdl"
                  stroke="#ffc658"
                  name="HDL (mg/dL)"
                  className="hdl-line"
                />

                <Line
                  type="monotone"
                  dataKey="triglycerides"
                  stroke="#090f13"
                  name="triglycerides (mg/dL)"
                  className="hdl-line"
                />
              </LineChart>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CholesterolMetrics;
