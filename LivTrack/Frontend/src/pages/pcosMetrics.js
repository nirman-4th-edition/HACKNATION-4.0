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
import "../styles/pcos.css";

const PCOSMetrics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [latestReport, setLatestReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    hormoneLevels: {
      lh: "",
      fsh: "",
      testosterone: "",
      amh: "",
      dheas: "",
    },
    metabolicMarkers: {
      fastingInsulin: "",
      fastingGlucose: "",
      hba1c: "",
    },
    cycleInfo: {
      cycleLength: "",
      cycleRegularity: "",
    },
    units: {
      lh: "mIU/mL",
      fsh: "mIU/mL",
      testosterone: "ng/dL",
      amh: "ng/mL",
      dheas: "μg/dL",
      fastingInsulin: "μIU/mL",
      fastingGlucose: "mg/dL",
      hba1c: "%",
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
        const response = await api.get("/health/pcos-metrics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const metricsData = response.data.data.metrics;
        setMetrics(
          metricsData.map((metric) => ({
            date: metric.date,
            lh: metric.hormoneLevels.lh[0],
            fsh: metric.hormoneLevels.fsh[0],
            testosterone: metric.hormoneLevels.testosterone[0],
            fastingInsulin: metric.metabolicMarkers.fastingInsulin[0],
            cycleLength: metric.cycleInfo.cycleLength[0],
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
        const response = await api.get("/health/pcos-metrics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const metricsData = response.data.data.metrics;
        const validReports = metricsData.filter(
          (report) => report.hormoneLevels.lh.length > 0
        );

        if (validReports.length > 0) {
          setLatestReport(validReports[validReports.length - 1]);
        } else {
          setLatestReport(null);
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
      await api.post("/health/pcos-metrics", formData);
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
        PCOS Health Metrics
      </Title>

      <div className="metrics-content">
        <Card shadow="sm" style={{ marginBottom: "2rem" }}>
          <Title order={4} style={{ marginBottom: "1rem" }}>
            Add New PCOS Measurement
          </Title>
          <form onSubmit={handleSubmit}>
            {/* Hormone Levels */}
            {Object.keys(formData.hormoneLevels).map((key) => (
              <TextInput
                key={key}
                label={`${key.toUpperCase()} (${formData.units[key]})`}
                value={formData.hormoneLevels[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hormoneLevels: {
                      ...formData.hormoneLevels,
                      [key]: e.target.value,
                    },
                  })
                }
                required
                style={{ marginBottom: "1rem" }}
              />
            ))}

            {/* Metabolic Markers */}
            {Object.keys(formData.metabolicMarkers).map((key) => (
              <TextInput
                key={key}
                label={`${key
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase()} (${formData.units[key]})`}
                value={formData.metabolicMarkers[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metabolicMarkers: {
                      ...formData.metabolicMarkers,
                      [key]: e.target.value,
                    },
                  })
                }
                required
                style={{ marginBottom: "1rem" }}
              />
            ))}

            {/* Cycle Information */}
            {Object.keys(formData.cycleInfo).map((key) => (
              <TextInput
                key={key}
                label={`${key
                  .replace(/([A-Z])/g, " $1")
                  .toUpperCase()}`}
                value={formData.cycleInfo[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cycleInfo: {
                      ...formData.cycleInfo,
                      [key]: e.target.value,
                    },
                  })
                }
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
          <div className="lastreports">
            <p>Date: {new Date(latestReport.date).toLocaleDateString()}</p>
            <p>LH: {latestReport.hormoneLevels.lh[0]} mIU/mL</p>
            <p>FSH: {latestReport.hormoneLevels.fsh[0]} mIU/mL</p>
            <p>Testosterone: {latestReport.hormoneLevels.testosterone[0]} ng/dL</p>
            <p>Fasting Insulin: {latestReport.metabolicMarkers.fastingInsulin[0]} μIU/mL</p>
            <p>Cycle Length: {latestReport.cycleInfo.cycleLength[0]} days</p>
            <p>Source: {latestReport.source}</p>
            <p>Comments: {latestReport.reportComments}</p>
          </div>
        ) : (
          <p>No reports available</p>
        )}

        <div className="pcos-container">
          <h2 className="pcos-title">PCOS Metrics Over Time</h2>
          <div className="pcos-chart">
            <Card shadow="sm" className="graph-card">
              <Title order={4} className="section-title">
                Hormonal Trends
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
                  dataKey="lh"
                  stroke="#8884d8"
                  name="LH (mIU/mL)"
                />
                <Line
                  type="monotone"
                  dataKey="fsh"
                  stroke="#82ca9d"
                  name="FSH (mIU/mL)"
                />
                <Line
                  type="monotone"
                  dataKey="testosterone"
                  stroke="#ffc658"
                  name="Testosterone (ng/dL)"
                />
                <Line
                  type="monotone"
                  dataKey="fastingInsulin"
                  stroke="#FF69B4"
                  name="Fasting Insulin (μIU/mL)"
                />
              </LineChart>
              <Button
                onClick={() => navigate("/pcos-graph")}
                style={{ marginTop: "1rem" }}
              >
                View Detailed Analysis
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCOSMetrics;