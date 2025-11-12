import { NextResponse } from "next/server";
import { getPool } from "../../../../utils/db";



export async function GET(_, { params }) {
  const { id } = params;
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM attractions WHERE id = ?", [id]);
  return NextResponse.json(rows[0] || {});
}

export async function DELETE(_, { params }) {
  const { id } = params;
  try {
    const pool = getPool();
    await pool.query("DELETE FROM attractions WHERE id = ?", [id]);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attraction:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
