"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAttraction() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    coverimage: "",
    latitude: "",
    longitude: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving...");

    try {
      const res = await fetch("/api/attractions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create attraction");

      setMessage("✅ Attraction added successfully!");
      setFormData({
        name: "",
        detail: "",
        coverimage: "",
        latitude: "",
        longitude: "",
      });

      // Go back to list after 2 seconds
      setTimeout(() => router.push("/attractions"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding attraction");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>Add New Attraction</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Detail:</label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          ></textarea>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Cover Image URL:</label>
          <input
            type="text"
            name="coverimage"
            value={formData.coverimage}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
          <div>
            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div>
            <label>Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Attraction
        </button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
}
