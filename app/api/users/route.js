"use server";

import bcrypt from "bcrypt";
import { query } from "@/lib/db";
import { withAuth } from "@/lib/auth";

export async function GET() {
  return withAuth(async () => {
    return query("SELECT * FROM users", [], 200);
  });
}

export async function POST(request) {
  const data = await request.json();
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const sql = "INSERT INTO users VALUES (?, ?, ?)";
  const { username, name, _ } = data;
  return query(sql, [username, name, hashedPassword], 201);
}

export async function DELETE(request) {
  return withAuth(async () => {
    const data = await request.json();
    const sql = "DELETE FROM users WHERE username = ?";
    return query(sql, [data.username], 204);
  });
}
