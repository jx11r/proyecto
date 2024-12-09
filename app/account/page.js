"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useState } from "react";

import { deleteUser } from "@/actions/auth";
import styles from "./page.module.css";

export default function Account() {
  const [state, formAction, isPending] = useActionState(deleteUser, null);
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
      <Form action={formAction} className={styles.registerForm}>
        <h1 className={styles.title}>Eliminar usuario</h1>
        {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
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
          Eliminar
        </button>
      </Form>
    </main>
  );
}
