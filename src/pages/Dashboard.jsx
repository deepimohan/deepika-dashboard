
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
  // Calculate dashboard statistics
  const total = certificates.length;

  const publications = certificates.filter(
    (c) => c.category === "Journal" || c.category === "Conference"
  ).length;

  const books = certificates.filter(
    (c) => c.category === "Book"
  ).length;

  const patents = certificates.filter(
    (c) => c.category === "Patent"
  ).length;

  // KPI card data
  const stats = [
    {
      value: total,
      label: "Total Items",
      icon: <BarChartIcon fontSize="large" />,
    },
    {
      value: publications,
      label: "Publications",
      icon: <ArticleIcon fontSize="large" />,
    },
    {
      value: books,
      label: "Books",
      icon: <MenuBookIcon fontSize="large" />,
    },
    {
      value: patents,
      label: "Patents",
      icon: <GavelIcon fontSize="large" />,
    },
  ];

  // KPI card gradient backgrounds
  const cardStyles = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #00c6ff, #0072ff)",
    "linear-gradient(135deg, #11998e, #38ef7d)",
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        {/* Top navigation */}
        <Topbar mode={mode} setMode={setMode} />

        {/* Dashboard content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            background: "linear-gradient(to right, #eef2f3, #e0eafc)",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <h2
            style={{
              fontWeight: 600,
              color: "#333",
              marginBottom: "5px",
            }}
          >
            Dashboard
          </h2>

          <p
            style={{
              color: "#666",
              marginBottom: "20px",
            }}
          >
            Welcome to your admin panel
          </p>

          {/* KPI Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
              gap: 2.5,
            }}
          >
            {stats.map((item, i) => (
              <Box
                key={item.label}
                sx={{
                  background: cardStyles[i],
                  color: "#fff",
                  p: 3,
                  borderRadius: "15px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 30px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>{item.icon}</Box>

                <h2 style={{ margin: 0 }}>{item.value}</h2>

                <p style={{ marginTop: "5px", marginBottom: 0 }}>
                  {item.label}
                </p>
              </Box>
            ))}
          </Box>

          {/* Analytics Charts */}
          <Box sx={{ mt: 5, width: "100%" }}>
            <Charts />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}