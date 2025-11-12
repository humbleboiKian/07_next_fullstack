import { NextResponse } from "next/server";
import { getPool } from "../../../utils/db";

// GET — show all attractions
export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM attractions");
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — create a new attraction
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, detail, coverimage, latitude, longitude } = body;

    // Check for missing fields
    if (!name || !detail) {
      return NextResponse.json({ error: "Name and detail are required" }, { status: 400 });
    }

    const pool = getPool();
    const [result] = await pool.query(
      "INSERT INTO attractions (name, detail, coverimage, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
      [name, detail, coverimage || null, latitude || null, longitude || null]
    );

    const insertedId = result.insertId;
    const [rows] = await pool.query("SELECT * FROM attractions WHERE id = ?", [insertedId]);

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting attraction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
