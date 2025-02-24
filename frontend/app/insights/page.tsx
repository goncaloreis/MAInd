"use client";

import React, { useState, useEffect } from 'react';

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [insight, setInsight] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken") || "";
    setToken(storedToken);
  }, []);

  const fetchInsight = async () => {
    try {
      const res = await fetch(`http://localhost:3001/insights?query=${encodeURIComponent(query)}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.text();
      setInsight(data);
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight('Error fetching insight');
    }
  };

  return (
    <div>
      <h1>Insights</h1>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query for insights"
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={fetchInsight} style={{ padding: '8px' }}>Get Insight</button>
      </div>
      {insight && <p style={{ marginTop: '20px' }}>{insight}</p>}
    </div>
  );
} 