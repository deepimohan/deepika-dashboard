import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

export default function Sidebar() {
  return (
    <div style={{
      width: "240px",                      // ✅ slightly wider
      height: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "25px 20px"                 // ✅ more padding
    }}>
      <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>

      <ul style={{ 
        listStyle: "none", 
        padding: 0,
        marginTop: "20px"                  // ✅ top gap
      }}>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/" style={linkStyle}>🏠 Dashboard</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/about" style={linkStyle}>
            <InfoIcon fontSize="small" />
            About
          </Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Book" style={linkStyle}>📘 Books</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Journal" style={linkStyle}>📄 Journals</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Conference" style={linkStyle}>🎤 Conferences</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Patent" style={linkStyle}>📜 Patents</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/FDP" style={linkStyle}>🎓 FDP</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Workshop" style={linkStyle}>🛠 Workshops</Link>
        </li>

        <li style={{ marginBottom: "18px" }}>
          <Link to="/Course" style={linkStyle}>📚 Courses</Link>
        </li>

      </ul>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",            // ✅ spacing between icon & text
  padding: "8px 10px",    // ✅ clickable area bigger
  borderRadius: "6px"
};