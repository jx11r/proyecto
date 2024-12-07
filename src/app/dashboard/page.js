"use client";

import { useState } from "react";

import Image from "next/image";
import styles from "./page.module.css";

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Todas");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <main className={styles.main}>
      <section className={styles.dashboard}>
        <h2>Resumen de Finanzas</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Ingresos</h3>
            <p>$2000</p>
          </div>
          <div className={styles.card}>
            <h3>Gastos</h3>
            <p>$1500</p>
          </div>
          <div className={styles.card}>
            <h3>Balance</h3>
            <p>$500</p>
          </div>
        </div>
      </section>

      <section className={styles.transactions}>
        <div className={styles.headerTransactions}>
          <h2>Transacciones:</h2>
          <select
            className={styles.monthSelect}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="Todas">Todas</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/12/2024</td>
                <td>Pago de alquiler</td>
                <td className={styles.gastos}>-$800</td>
                <td>Gastos</td>
                <td>
                  <button className={styles.deleteButton}>
                    <Image
                      aria-hidden
                      src="/icons/trash-can.svg"
                      alt="Eliminar transacción"
                      width={18}
                      height={18}
                    />
                  </button>
                </td>
              </tr>
              <tr>
                <td>30/11/2024</td>
                <td>Salario</td>
                <td className={styles.ingresos}>$2000</td>
                <td>Ingresos</td>
                <td>
                  <button className={styles.deleteButton}>
                    <Image
                      aria-hidden
                      src="/icons/trash-can.svg"
                      alt="Eliminar transacción"
                      width={18}
                      height={18}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
