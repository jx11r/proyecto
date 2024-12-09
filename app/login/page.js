"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useState } from "react";

import { login } from "@/actions/auth";
import styles from "./page.module.css";

export default function Login() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
      <Form action={formAction} className={styles.loginForm}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
        {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="off"
            autoCorrect="off"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="off"
            required
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className={styles.loginButton}
        >
          Entrar
        </button>
      </Form>
    </main>
  );
}
