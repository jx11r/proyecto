"use server";

import { redirect } from "next/navigation";

import { api, request } from "@/lib/api";
import { createSession } from "@/lib/session";

export async function login(state, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const response = await request(api.auth, "POST", {
    username,
    password,
  });

  if (!response.ok) {
    return {
      error:
        response.status == 400
          ? "El usuario no existe."
          : "La contraseña es incorrecta.",
    };
  }

  await createSession(username);
  redirect("/dashboard");
}
