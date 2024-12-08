"use server";

import { redirect } from "next/navigation";

import { api, request } from "@/lib/api";
import { createSession, deleteSession } from "@/lib/session";

export async function login(state, formData) {
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
  redirect("/dashboard");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
