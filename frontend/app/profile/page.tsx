"use client";

import React, { useEffect, useState } from "react";

interface UserProfile {
  username: string;
  name: string;
  email: string;
  interests: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProfile, setEditProfile] = useState({ name: "", email: "", interests: "" });

  const token = typeof window !== "undefined" ? localStorage.getItem("jwtToken") : "";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/user", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) {
          setError("Failed to fetch profile");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProfile(data);
        setEditProfile({ 
          name: data.name, 
          email: data.email, 
          interests: data.interests.join(", ")
        });
      } catch (e) {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setError("Not authenticated");
      setLoading(false);
    }
  }, [token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editProfile.name,
          email: editProfile.email,
          interests: editProfile.interests.split(",").map(i => i.trim())
        })
      });
      if (!res.ok) {
        setError("Update failed");
        return;
      }
      const updatedProfile = await res.json();
      setProfile(updatedProfile);
      setError("");
    } catch (e) {
      setError("Update error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Profile</h1>
      {profile && (
        <div>
          <h2>Current Profile</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <h2>Update Profile</h2>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Name:</label>
            <input
              type="text"
              value={editProfile.name}
              onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Email:</label>
            <input
              type="email"
              value={editProfile.email}
              onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Interests (comma separated):</label>
            <input
              type="text"
              value={editProfile.interests}
              onChange={(e) => setEditProfile({ ...editProfile, interests: e.target.value })}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
} 