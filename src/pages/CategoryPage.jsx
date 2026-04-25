import Sidebar from "../components/Sidebar";
import { certificates } from "../data/data";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CategoryPage() {

  const { type } = useParams();

  const filtered = certificates.filter(
    item => item.category.toLowerCase() === type.toLowerCase()
  );

  const exportPDF = async () => {
    const element = document.getElementById("pdf-content");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save(`${type}-certificates.pdf`);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h2>{type}</h2>

        {/* ✅ EXPORT BUTTON */}
        <button 
          onClick={exportPDF} 
          style={{ marginBottom: "20px", padding: "10px", cursor: "pointer" }}
        >
          Export PDF
        </button>

        {/* ✅ WRAP CONTENT FOR PDF */}
        <div id="pdf-content">

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {filtered.map((item, index) => (
              <div key={index} style={{
                background: "#f5f5f5",
                padding: "15px",
                borderRadius: "10px",
                width: "250px"
              }}>
                <h4>{item.title}</h4>
                <p>Year: {item.year}</p>

                <a href={item.link} target="_blank" rel="noreferrer">
                  View
                </a>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}