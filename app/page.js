import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to My Attractions App</h1>
      <p>This project connects Next.js to MySQL using API routes.</p>

      <div style={{ marginTop: "20px" }}>
        <Link
          href="/attractions"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          View All Attractions
        </Link>
      </div>
    </main>
  );
}
