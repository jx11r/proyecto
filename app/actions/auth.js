"use server";

import { api, request } from "@/lib/api";
import { createSession } from "@/lib/session";

export async function signup(state, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const response = await request(api.auth, "POST", {
    username,
    password,
  });

  if (response.status != 204) {
    return {
      error: true,
    };
  }

  await createSession(username);
}
