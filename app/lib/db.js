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

export async function query(sql, params, status = null) {
  try {
    const [content] = await pool.execute(sql, params);
    if (status) {
      if (status == 200) {
        return Response.json({ content }, { status });
      }
      return new Response(null, { status });
    }
    return content;
  } catch (error) {
    console.error(error);
    if (status) {
      return new Response(null, { status: 500 });
    }
  }
}
