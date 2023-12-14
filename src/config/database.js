import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { resolve } from "path";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("connected to mysql database");
    connection.release();
  })
  .catch((error) => {
    console.error("error connecting to mysql database:", error.message);
  });

export default pool;
