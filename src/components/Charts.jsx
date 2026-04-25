import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, Bar } from "react-chartjs-2";
import { certificates } from "../data/data";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

export default function Charts() {

  const catCount = {};
  const yearCount = {};

  certificates.forEach(c => {
    catCount[c.category] = (catCount[c.category] || 0) + 1;
    yearCount[c.year] = (yearCount[c.year] || 0) + 1;
  });

  // 🎨 PIE DATA
  const pieData = {
    labels: Object.keys(catCount),
    datasets: [
      {
        data: Object.values(catCount),
        backgroundColor: [
          "#6366F1",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899"
        ],
        borderColor: "#fff",
        borderWidth: 2
      }
    ]
  };

  // 🎨 BAR DATA
  const barData = {
    labels: Object.keys(yearCount),
    datasets: [
      {
        label: "Count",
        data: Object.values(yearCount),
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        barThickness: 30
      }
    ]
  };

  // 🎯 COMMON OPTIONS
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#fff",
        bodyColor: "#fff"
      },
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "top",
        font: {
          weight: "bold"
        },
        formatter: value => value
      }
    },
    scales: {
      x: {
        ticks: { color: "#555" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#555" },
        grid: { color: "#e5e7eb" },
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "30px",
      marginTop: "20px"
    }}>

      {/* 🔵 PIE CHART */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        height: "350px"
      }}>
        <h4 style={{ marginBottom: "15px" }}>
          Category Distribution
        </h4>

        {/* Controlled size */}
        <div style={{ width: "260px", margin: "auto" }}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* 📊 BAR CHART */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        height: "350px"
      }}>
        <h4 style={{ marginBottom: "15px" }}>
          Year-wise Data
        </h4>

        {/* Bigger readable chart */}
        <div style={{ height: "250px" }}>
          <Bar data={barData} options={options} />
        </div>
      </div>

    </div>
  );
}