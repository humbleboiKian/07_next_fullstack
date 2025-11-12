"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AttractionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttractions() {
      try {
        const res = await fetch("/api/attractions");
        const attractions = await res.json();
        setData(attractions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAttractions();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading attractions...</p>;

  if (!data.length)
    return <p style={{ textAlign: "center" }}>No attractions found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>All Attractions</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <Link
    href="/attractions/add"
    style={{
      backgroundColor: "#0070f3",
      color: "white",
      padding: "8px 15px",
      borderRadius: "6px",
      textDecoration: "none",
    }}
  >
    ➕ Add New Attraction
  </Link>
</div>

      {data.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h2>
            <Link href={`/attractions/${a.id}`}>{a.name}</Link>
          </h2>
          <p>{a.detail}</p>
          {a.coverimage && (
            <img
              src={a.coverimage}
              alt={a.name}
              width="300"
              style={{ borderRadius: "10px", marginTop: "10px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
