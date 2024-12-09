"use server";

import { redirect } from "next/navigation";

import { api, request } from "@/lib/api";
import { verifySession } from "@/lib/dal";
import { createSession, deleteSession } from "@/lib/session";

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

export async function deleteUser(state, formData) {
  const session = await verifySession();
  const password = formData.get("password");
  const response = await request(api.auth, "POST", {
    username: session.username,
    password,
  });

  if (!response.ok) {
    return {
      error: "La contraseña es incorrecta.",
    };
  }

  const resp = await request(api.users, "DELETE", {
    username: session.username,
  });

  if (resp.ok) {
    await deleteSession();
    redirect("/login");
  }
}
