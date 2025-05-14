"use client"; // Forces this component to be client-side

import { useState } from "react";

export default function StockSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Screener Stock Search</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>{results.map((stock, index) => <li key={index}>{stock.name}</li>)}</ul>
    </div>
  );
}
