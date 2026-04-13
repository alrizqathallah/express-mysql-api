import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export default dbPool;

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// import logger from "./logger.js";

// dotenv.config({ path: ".env.local" });

// // Validasi environment variables
// const requiredDbVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
// for (const envVar of requiredDbVars) {
//   if (!process.env[envVar]) {
//     logger.error(`Database configuration error: ${envVar} tidak terdefinisi!`);
//     throw new Error(`Missing database configuration: ${envVar}`);
//   }
// }

// const dbPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10, // Batas koneksi simultan
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 10000, // 10 detik
// });

// // Event listener untuk error pool
// dbPool.on("error", (err) => {
//   logger.error("Database pool error:", err.message);
// });

// dbPool.on("connection", () => {
//   logger.debug("Database connection created");
// });

// dbPool.on("release", () => {
//   logger.debug("Database connection released");
// });

// export default dbPool;
