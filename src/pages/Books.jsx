import Sidebar from "../components/Sidebar";
import { certificates } from "../data/data";

export default function Books() {

  const books = certificates.filter(item => item.category === "Book");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h2>Books</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {books.map((book, index) => (
            <div key={index} style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "10px",
              width: "250px"
            }}>
              <h4>{book.title}</h4>
              <p>Year: {book.year}</p>
              

              <a href={book.link} target="_blank">
                View Book
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}