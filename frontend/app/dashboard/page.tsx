"use client";

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on('connect', () => {
      console.log('Connected to chat server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
      setResponse(data);
    });

    return () => {
      if(socket) socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('message', message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard for the Mαind app.</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Chat</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px' }}>Send</button>
        <p>Server response: {response}</p>
      </div>
    </div>
  );
} 