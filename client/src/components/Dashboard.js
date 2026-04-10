import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ logs }) => {
  // Example: logs = [{ activity: "Car", emissions: 10 }, ...]

  const labels = logs.map((log) => log.activity);

  const dataValues = logs.map((log) => log.emissions);

  const data = {
    labels,
    datasets: [
      {
        label: "Carbon Emissions",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const totalEmissions = dataValues.reduce((a, b) => a + b, 0);

  return (
  <div>
    <h2>Dashboard</h2>

    <h3>Total Emissions: {totalEmissions}</h3>

    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Bar data={data} />
    </div>
  </div>
);
};

export default Dashboard;