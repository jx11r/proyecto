"use server";

import bcrypt from "bcrypt";
import { query } from "@/lib/db";

export async function POST(request) {
  const data = await request.json();
  const sql = "SELECT password FROM users WHERE username = ?";
  const content = await query(sql, [data.username]);

  if (
    content.length > 0 &&
    bcrypt.compareSync(data.password, content[0].password)
  ) {
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 401 });
}
