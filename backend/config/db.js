// ./config/db.js

import mysql from "mysql2/promise";

let db;

try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "water-jar-app", // ✅ change dash to underscore
  });

  console.log("✅ Connected to MySQL Database");
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

export default db;
