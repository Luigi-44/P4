import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

const { DB_PORT } = process.env;

export const connectionBDD = mysql2.createPool({
  host: process.env.DB_HOST,
  port: Number.parseInt(DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const initDB = () => {
  connectionBDD.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Erreur de connexion à MySQL :", err);
      return;
    }
    console.log("✅ Connecté à SignetPro");
    connection.release();
  });
};
