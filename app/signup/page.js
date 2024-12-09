"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useState } from "react";

import { signup } from "@/actions/form";
import styles from "./page.module.css";

export default function Signup() {
  const [state, formAction, isPending] = useActionState(signup, null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
      <Form action={formAction} className={styles.registerForm}>
        <h1 className={styles.title}>Registro</h1>
        {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="off"
            autoComplete="off"
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
          className={styles.registerButton}
          type="submit"
        >
          Registrarse
        </button>
      </Form>
    </main>
  );
}
