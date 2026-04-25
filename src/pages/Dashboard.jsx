import Sidebar from "../components/Sidebar";
import Charts from "../components/Charts";
import { certificates } from "../data/data";
import Topbar from "../components/Topbar";
import { Box } from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GavelIcon from "@mui/icons-material/Gavel";

export default function Dashboard({ mode, setMode }) {

  const total = certificates.length;

  const publications = certificates.filter(
    c => c.category === "Journal" || c.category === "Conference"
  ).length;

  const books = certificates.filter(c => c.category === "Book").length;

  const patents = certificates.filter(c => c.category === "Patent").length;

  const stats = [
    { value: total, label: "Total Items", icon: <BarChartIcon fontSize="large" /> },
    { value: publications, label: "Publications", icon: <ArticleIcon fontSize="large" /> },
    { value: books, label: "Books", icon: <MenuBookIcon fontSize="large" /> },
    { value: patents, label: "Patents", icon: <GavelIcon fontSize="large" /> }
  ];

  const cardStyles = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #00c6ff, #0072ff)",
    "linear-gradient(135deg, #11998e, #38ef7d)"
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar mode={mode} setMode={setMode} />

        <div style={{
          padding: "30px",
          background: "linear-gradient(to right, #eef2f3, #e0eafc)",
          minHeight: "100vh"
        }}>

          {/* HEADER */}
          <h2 style={{
            fontWeight: "600",
            color: "#333",
            marginBottom: "5px"
          }}>
            Dashboard
          </h2>

          <p style={{
            color: "#666",
            marginBottom: "20px"
          }}>
            Welcome to your admin panel
          </p>

          {/* 🔥 KPI CARDS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}>

            {stats.map((item, i) => (
              <div
                key={i}
                style={{
                  background: cardStyles[i],
                  color: "#fff",
                  padding: "25px",
                  borderRadius: "15px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{ marginBottom: "10px" }}>
                  {item.icon}
                </div>

                <h2 style={{ margin: 0 }}>{item.value}</h2>
                <p style={{ marginTop: "5px" }}>{item.label}</p>
              </div>
            ))}

          </div>

          {/* 📊 CHART SECTION */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "40px"
          }}>

            <div style={chartCard}>
              <h3 style={{ marginBottom: "15px" }}>Analytics Overview</h3>
              <Charts />
            </div>

          </div>

        </div>
      </Box>
    </div>
  );
}

const chartCard = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};