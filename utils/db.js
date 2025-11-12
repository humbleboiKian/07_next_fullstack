// utils/db.js
import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "u6708266",           // 👈 your MySQL username
      password: "Kian@2005",       // 👈 your MySQL password (if none, use "")
      database: "u6708266_dit205", // 👈 your DB name from phpMyAdmin
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
