import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initDatabase() {
  console.log("🔄 Initializing database tables...");

  await turso.executeMultiple(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed admin user if not exists
  const existing = await turso.execute({
    sql: "SELECT id FROM admin_users WHERE username = ?",
    args: ["tecwebstudio"],
  });

  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash("Ca715bed76+", 12);
    await turso.execute({
      sql: "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
      args: ["tecwebstudio", hash],
    });
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  console.log("✅ Database initialized successfully");
}

initDatabase().catch(console.error);
