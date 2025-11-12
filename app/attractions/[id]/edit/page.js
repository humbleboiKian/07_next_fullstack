"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAttraction() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    coverimage: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch existing data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/attractions/${id}`);
        if (!res.ok) throw new Error("Failed to fetch attraction");
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching attraction:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Saving changes...");

    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update attraction");

      setMessage("✅ Attraction updated successfully!");
      setTimeout(() => router.push(`/attractions/${id}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error updating attraction.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Edit Attraction</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
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

        <div style={{ marginBottom: 12 }}>
          <label>Detail:</label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, minHeight: 80 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Cover Image URL:</label>
          <input
            type="text"
            name="coverimage"
            value={formData.coverimage}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ flex: 1 }}>
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

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#0070f3",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            💾 Save Changes
          </button>

          <Link
            href={`/attractions/${id}`}
            style={{
              backgroundColor: "#95a5a6",
              color: "white",
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ✖ Cancel
          </Link>
        </div>
      </form>

      {message && (
        <p
          style={{
            marginTop: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
