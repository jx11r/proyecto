import styles from "./page.module.css";

export default function AddTransaction() {
  return (
    <main>
      <section className={styles["add-transaction"]}>
        <h2>Nueva Transacción</h2>
        <form className={styles["transaction-form"]}>
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
              placeholder="Ej. Pago de alquiler"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="amount">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Ej. 500"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" required>
              <option value="ingresos">Ingresos</option>
              <option value="gastos">Gastos</option>
            </select>
          </div>
          <div className={styles["form-actions"]}>
            <button type="submit" className={`${styles.btn} ${styles.green}`}>
              Añadir
            </button>
            <button type="reset" className={`${styles.btn} ${styles.red}`}>
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
