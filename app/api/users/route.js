"use server";

import { query } from "@/lib/db";

export async function GET() {
  return query("SELECT * FROM users");
}

export async function POST(request) {
  const data = await request.json();
  const sql = "INSERT INTO users VALUES (?, ?, ?)";
  const params = Object.values(data);
  return query(sql, params, 201);
}

export async function DELETE(request) {
  const data = await request.json();
  const sql = "DELETE FROM users WHERE username = ?";
  return query(sql, [data.username]);
}
