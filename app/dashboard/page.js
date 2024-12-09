"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { api, get, request } from "@/lib/api";
import styles from "./page.module.css";

const SummaryCard = ({ title, amount }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{amount}</p>
    </div>
  );
};

const TransactionTable = ({ filteredData, formatDate, onDelete }) => {
  return (
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
          {filteredData &&
            filteredData.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td
                  className={
                    transaction.category === "Ingresos"
                      ? styles.ingresos
                      : styles.gastos
                  }
                >
                  {transaction.category === "Gastos" ? "-" : ""}$
                  {transaction.amount}
                </td>
                <td>{transaction.category}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(transaction.id)}
                  >
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
            ))}
        </tbody>
      </table>
    </div>
  );
};

const MonthSelector = ({ availableMonths, selectedMonth, onMonthChange }) => {
  return (
    <div className={styles.headerTransactions}>
      <h2>Transacciones:</h2>
      <select
        className={styles.monthSelect}
        value={selectedMonth}
        onChange={onMonthChange}
      >
        <option value="Todas">Todas</option>
        {availableMonths.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("Todas");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [summary, setSummary] = useState({
    ingresos: 0,
    gastos: 0,
    balance: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth === "Todas") {
      setFilteredData(data);
      calculateSummary(data);
    } else {
      filterDataByMonth(selectedMonth);
    }
  }, [selectedMonth, data]);

  async function fetchData() {
    const content = await get(api.transactions);
    setData(content);
    setFilteredData(content);
    calculateSummary(content);
    extractMonths(content);
  }

  const extractMonths = (transactions) => {
    const months = transactions.map((transaction) => {
      const date = new Date(transaction.date);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${year}`;
    });

    const uniqueMonths = [...new Set(months)];
    setAvailableMonths(uniqueMonths);
  };

  const filterDataByMonth = (month) => {
    const [monthSelected, yearSelected] = month.split("/");

    const filtered = data.filter((transaction) => {
      const date = new Date(transaction.date);
      const monthOfTransaction = String(date.getMonth() + 1).padStart(2, "0");
      const yearOfTransaction = date.getFullYear().toString().slice(-2);
      return (
        monthOfTransaction === monthSelected &&
        yearOfTransaction === yearSelected
      );
    });

    setFilteredData(filtered);
    calculateSummary(filtered);
  };

  const calculateSummary = (transactions) => {
    if (!transactions) return;

    let ingresos = 0;
    let gastos = 0;

    transactions.forEach((transaction) => {
      if (transaction.category === "Ingresos") {
        ingresos += transaction.amount;
      } else {
        gastos += transaction.amount;
      }
    });

    const balance = ingresos - gastos;

    setSummary({
      ingresos,
      gastos,
      balance,
    });
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDelete = async (id) => {
    const response = await request(api.transactions, "DELETE", { id });
    if (response && response.ok) {
      const updatedData = data.filter((transaction) => transaction.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      calculateSummary(updatedData);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  return (
    <main className={styles.main}>
      <section className={styles.dashboard}>
        <h2>Resumen de Finanzas</h2>
        <div className={styles.cards}>
          <SummaryCard title="Ingresos" amount={`$${summary.ingresos}`} />
          <SummaryCard title="Gastos" amount={`$${summary.gastos}`} />
          <SummaryCard
            title="Balance"
            amount={`${summary.balance < 0 ? "-" : ""}\$${Math.abs(
              summary.balance
            )}`}
          />
        </div>
      </section>

      <section className={styles.transactions}>
        <MonthSelector
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <TransactionTable
          filteredData={filteredData}
          formatDate={formatDate}
          onDelete={handleDelete}
        />
        {!data || data.length == 0 ? (
          <p className={styles.noData}>
            Aún no se han registrado transacciones.
          </p>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}
