"use client";

import React, { useState } from 'react';

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("jwtToken", data.token);
    } catch (error) {
      console.error("Login failed", error);
      setToken("");
      localStorage.removeItem("jwtToken");
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {token && (
        <div>
          <h2>Your Token</h2>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
} 