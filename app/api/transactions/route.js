"use server";

import { query } from "@/lib/db";

export async function GET() {
  return query("SELECT * FROM transactions");
}

export async function POST(request) {
  const data = await request.json();
  const sql = "INSERT INTO transactions VALUES (NULL, ?, ?, ?, ?, ?)";
  const params = Object.values(data);
  return query(sql, params, 201);
}

export async function DELETE(request) {
  const data = await request.json();
  const sql = "DELETE FROM transactions WHERE id = ?";
  return query(sql, [data.id]);
}
