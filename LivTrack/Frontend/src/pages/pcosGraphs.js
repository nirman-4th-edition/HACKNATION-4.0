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
import "../styles/pcosgraph.css";

const PCOSGraphs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  const getLatestMetrics = () => {
    if (metrics.length === 0) return { 
      lh: "-", 
      fsh: "-", 
      testosterone: "-", 
      fastingInsulin: "-" 
    };
    const latest = metrics[metrics.length - 1];
    return {
      lh: latest.lh,
      fsh: latest.fsh,
      testosterone: latest.testosterone,
      fastingInsulin: latest.fastingInsulin,
    };
  };

  const latestMetrics = getLatestMetrics();

  if (loading) return <LoadingOverlay visible={true} />;

  return (
    <div className="pcos-container">
      <h2 className="pcos-title">PCOS Health Metrics Over Time</h2>
      <div className="metrics-boxes">
        <Card className="metric-box lh-box">
          LH: {latestMetrics.lh} mIU/mL
        </Card>
        <Card className="metric-box fsh-box">
          FSH: {latestMetrics.fsh} mIU/mL
        </Card>
        <Card className="metric-box testosterone-box">
          Testosterone: {latestMetrics.testosterone} ng/dL
        </Card>
        <Card className="metric-box insulin-box">
          Fasting Insulin: {latestMetrics.fastingInsulin} μIU/mL
        </Card>
      </div>
      <div className="pcos-chart">
        <Card shadow="sm" className="graph-card">
          <Title order={4} className="section-title">
            Hormonal & Metabolic Trends
          </Title>
          <LineChart
            width={800}
            height={400}
            data={metrics}
            className="animated-chart"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
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
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="fsh"
              stroke="#82ca9d"
              name="FSH (mIU/mL)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="testosterone"
              stroke="#ffc658"
              name="Testosterone (ng/dL)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="fastingInsulin"
              stroke="#FF69B4"
              name="Fasting Insulin (μIU/mL)"
              strokeWidth={2}
            />
          </LineChart>
        </Card>
      </div>
    </div>
  );
};

export default PCOSGraphs;