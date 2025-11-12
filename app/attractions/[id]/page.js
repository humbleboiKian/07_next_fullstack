"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AttractionDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/attractions/${id}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching attraction:", error);
      }
    }
    fetchData();
  }, [id]);

  // 🗑️ DELETE function
  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${data.name}"?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Attraction deleted successfully!");
        router.push("/attractions");
      } else {
        alert("❌ Failed to delete attraction.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("⚠️ Error deleting attraction.");
    } finally {
      setLoading(false);
    }
  }

  if (!data) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{data.name}</h1>
      <p style={{ fontSize: "1.1rem" }}>{data.detail}</p>

      {data.coverimage && (
        <img
          src={data.coverimage}
          alt={data.name}
          style={{
            borderRadius: "10px",
            marginTop: "15px",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      )}

      <p style={{ marginTop: "10px" }}>
        📍 <b>Lat:</b> {data.latitude}, <b>Lng:</b> {data.longitude}
      </p>

      {/* Buttons */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Link
          href={`/attractions/${data.id}/edit`}
          style={{
            backgroundColor: "#f39c12",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ✏️ Edit
        </Link>

        <button
          onClick={handleDelete}
          disabled={loading}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Deleting..." : "🗑️ Delete"}
        </button>

        <Link
          href="/attractions"
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to List
        </Link>
      </div>
    </div>
  );
}
