"use server";

import { query } from "@/lib/db";
import { verifySession, withAuth } from "@/lib/dal";

export async function GET() {
  return withAuth(async (session) => {
    return query(
      "SELECT * FROM transactions WHERE username = ?",
      [session.username],
      200
    );
  });
}

export async function POST(request) {
  const data = await request.json();
  const sql = "INSERT INTO transactions VALUES (NULL, ?, ?, ?, ?, ?)";
  const params = Object.values(data);
  return query(sql, params, 201);
}

export async function DELETE(request) {
  return withAuth(async () => {
    const data = await request.json();
    const sql = "DELETE FROM transactions WHERE id = ?";
    return query(sql, [data.id], 204);
  });
}
