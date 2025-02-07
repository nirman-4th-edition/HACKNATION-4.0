import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button, Card, Title, LoadingOverlay } from "@mantine/core";
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
import "../styles/cholesterolgraph.css";

const CholesterolMetrics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  const getLatestMetrics = () => {
    if (metrics.length === 0) return { ldl: "-", hdl: "-", triglycerides: "-" };
    const latest = metrics[metrics.length - 1];
    return {
      ldl: latest.ldl,
      hdl: latest.hdl,
      triglycerides: latest.triglycerides,
    };
  };

  const latestMetrics = getLatestMetrics();

  if (loading) return <LoadingOverlay visible={true} />;

  return (
    <div className="cholesterol-container">
      <h2 className="cholesterol-title">Cholesterol Levels Over Time</h2>
      <div className="metrics-boxes">
        <Card className="metric-box ldl-box">
          LDL: {latestMetrics.ldl} mg/dL
        </Card>
        <Card className="metric-box hdl-box">
          HDL: {latestMetrics.hdl} mg/dL
        </Card>
        <Card className="metric-box triglycerides-box">
          Triglycerides: {latestMetrics.triglycerides} mg/dL
        </Card>
      </div>
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
            />
            <Line
              type="monotone"
              dataKey="ldl"
              stroke="#82ca9d"
              name="LDL (mg/dL)"
            />
            <Line
              type="monotone"
              dataKey="hdl"
              stroke="#ffc658"
              name="HDL (mg/dL)"
            />
            <Line
              type="monotone"
              dataKey="triglycerides"
              stroke="#F8F8FF"
              name="Triglycerides (mg/dL)"
            />
          </LineChart>
        </Card>
      </div>
    </div>
  );
};

export default CholesterolMetrics;
