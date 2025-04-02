import mysql2 from "mysql2"
import dotenv from "dotenv";

dotenv.config();

const { DB_PORT } = process.env;

export const connectionBDD = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: Number.parseInt(DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export const initDB = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  connectionBDD.connect((err: any) => {
    if (err) {
      console.error('❌ Erreur de connexion à MySQL :', err);
      return;
    }
    console.log('✅ Connecté à SignetPro');
  });
}
