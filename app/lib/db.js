import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
});

export async function query(sql, params = [], status = 200) {
  try {
    const [content] = await pool.execute(sql, params);
    return Response.json({ content }, { status });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
