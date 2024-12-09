"use client";

import Form from "next/form";
import { useActionState } from "react";

import { add } from "@/actions/form";
import styles from "./page.module.css";

export default function AddTransaction() {
  const [state, formAction, isPending] = useActionState(add, null);
  return (
    <main>
      <section className={styles["add-transaction"]}>
        <h2>Nueva Transacción</h2>
        {state?.error && <p className={styles.errorMessage}>{state.error}</p>}
        <Form action={formAction} className={styles["transaction-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="date">Fecha</label>
            <input type="date" id="date" name="date" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Pago de alquiler"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="500"
              autoComplete="off"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" required>
              <option value="Ingresos">Ingresos</option>
              <option value="Gastos">Gastos</option>
            </select>
          </div>
          <div className={styles["form-actions"]}>
            <button
              disabled={isPending}
              type="submit"
              className={`${styles.btn} ${styles.green}`}
            >
              Añadir
            </button>
            <button type="reset" className={`${styles.btn} ${styles.red}`}>
              Cancelar
            </button>
          </div>
        </Form>
      </section>
    </main>
  );
}
