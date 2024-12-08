"use server";

import { query } from "@/lib/db";
import { withAuth } from "@/lib/auth";

export async function GET() {
  return withAuth(async () => {
    return query("SELECT * FROM transactions", [], 200);
  });
}

export async function POST(request) {
  return withAuth(async () => {
    const data = await request.json();
    const sql = "INSERT INTO transactions VALUES (NULL, ?, ?, ?, ?, ?)";
    const params = Object.values(data);
    return query(sql, params, 201);
  });
}

export async function DELETE(request) {
  return withAuth(async () => {
    const data = await request.json();
    const sql = "DELETE FROM transactions WHERE id = ?";
    return query(sql, [data.id], 204);
  });
}
