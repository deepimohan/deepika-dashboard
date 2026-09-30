
import Sidebar from "../components/Sidebar";
import { certificates } from "../data/data";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CategoryPage() {
  const { type = "" } = useParams();

  // Filter records based on the selected category.
  const filtered = certificates.filter(
    (item) =>
      (item.category || "").toLowerCase() === type.toLowerCase()
  );

  // Exclude these fields from the table.
  const excludedColumns = ["category", "link", "viewlink"];

  // Dynamically generate columns from the available record fields.
  const columns = [
    ...new Set(filtered.flatMap((item) => Object.keys(item))),
  ].filter(
    (column) => !excludedColumns.includes(column.toLowerCase())
  );

  // Format column headings.
  const formatHeader = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());

  // Display missing values as a dash.
  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  // Export table content as a landscape PDF.
  const exportPDF = async () => {
    const element = document.getElementById("pdf-content");

    if (!element || filtered.length === 0) {
      alert("No records available to export.");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const imageHeight =
        (canvas.height * usableWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = margin;

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        position,
        usableWidth,
        imageHeight
      );

      heightLeft -= usableHeight;

      while (heightLeft > 0) {
        pdf.addPage();
        position = margin - (imageHeight - heightLeft);

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          usableWidth,
          imageHeight
        );

        heightLeft -= usableHeight;
      }

      pdf.save(`${type || "category"}-certificates.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Unable to export PDF. Please try again.");
    }
  };

  const cellStyle = {
    padding: "12px 14px",
    borderBottom: "1px solid #e2e8f0",
    textAlign: "left",
    verticalAlign: "top",
    fontSize: "13px",
    overflowWrap: "anywhere",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "24px",
          background: "#f8fafc",
        }}
      >
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "8px",
            textTransform: "capitalize",
          }}
        >
          {type}
        </h2>

        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Total Records: {filtered.length}
        </p>

        <button
          onClick={exportPDF}
          disabled={filtered.length === 0}
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            cursor: filtered.length ? "pointer" : "not-allowed",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            opacity: filtered.length ? 1 : 0.5,
          }}
        >
          Export PDF
        </button>

        <div
          id="pdf-content"
          style={{
            background: "#ffffff",
            padding: "16px",
            borderRadius: "10px",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              marginTop: 0,
              marginBottom: "16px",
              textTransform: "capitalize",
            }}
          >
            {type} Records
          </h3>

          {filtered.length === 0 ? (
            <p style={{ color: "#64748b" }}>
              No records found for this category.
            </p>
          ) : (
            <div
              style={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: "900px",
                  borderCollapse: "collapse",
                  tableLayout: "auto",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#334155",
                      color: "#ffffff",
                    }}
                  >
                    <th style={cellStyle}>S.No.</th>

                    {columns.map((column) => (
                      <th key={column} style={cellStyle}>
                        {formatHeader(column)}
                      </th>
                    ))}

                    <th style={cellStyle}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((item, index) => {
                    const itemLink = item.viewLink || item.link;

                    return (
                      <tr
                        key={item.id || `${item.title}-${index}`}
                        style={{
                          background:
                            index % 2 === 0 ? "#ffffff" : "#f1f5f9",
                        }}
                      >
                        <td style={cellStyle}>{index + 1}</td>

                        {columns.map((column) => (
                          <td key={column} style={cellStyle}>
                            {formatValue(item[column])}
                          </td>
                        ))}

                        <td style={cellStyle}>
                          {itemLink ? (
                            <a
                              href={itemLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-block",
                                padding: "7px 12px",
                                background: "#2563eb",
                                color: "#ffffff",
                                borderRadius: "6px",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                              }}
                            >
                              View
                            </a>
                          ) : (
                            "Not available"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}