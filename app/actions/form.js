"use server";

import { redirect } from "next/navigation";
import { api, request } from "@/lib/api";
import { verifySession } from "@/lib/dal";

export async function signup(state, formData) {
  const username = formData.get("username");
  if (username.length > 20) {
    return {
      error: "El nombre de usuario no puede tener más de 20 caracteres.",
    };
  }

  const password = formData.get("password");
  const response = await request(api.users, "POST", {
    username,
    password,
  });

  if (!response.ok) {
    return {
      error: "El nombre de usuario ya existe.",
    };
  }

  redirect("/login");
}

export async function add(state, formData) {
  const session = await verifySession();
  const response = await request(api.transactions, "POST", {
    date: formData.get("date"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    username: session.username,
  });

  if (!response.ok) {
    return { error: "No se pudo agregar la nueva transacción." };
  }
}
