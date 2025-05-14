"use client"; // This ensures client-side execution

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();

    console.log("API Response:", data); // Debugging output

    // Ensure the response is always an array
    setResults(Array.isArray(data) ? data : []);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>Screener Stock Search</h1>
      <input
        type="text"
        placeholder="Enter stock name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 15px", cursor: "pointer" }}>
        Search
      </button>
      <ul style={{ marginTop: "20px", listStyle: "none" }}>
        {results.map((stock, index) => (
          <li key={index} style={{ padding: "5px 0" }}>{stock.name}</li>
        ))}
      </ul>
    </div>
  );
}
