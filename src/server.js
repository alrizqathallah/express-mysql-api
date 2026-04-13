import app from "./app/app.js";
import dotenv from "dotenv";
import dbPool from "./app/configs/database.js";
import logger from "./app/configs/logger.js";

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => logger.info(`Server is running on port: ${PORT}`));

dbPool
  .getConnection()
  .then((connection) => {
    logger.info("Koneksi ke database MYSQL berhasil!");
    connection.release();
  })
  .catch((err) => {
    logger.error("Gagal terhubung ke database MYSQL:", err.message);
    process.exit(1);
  });

console.log("Cek NODE_ENV:", process.env.NODE_ENV);
console.log("Cek DB_HOST:", process.env.DB_HOST);

// import app from "./app/app.js";
// import dotenv from "dotenv";
// import dbPool from "./app/configs/database.js";
// import logger from "./app/configs/logger.js";

// // Load environment variables
// dotenv.config({ path: ".env.local" });

// // Validasi environment variables yang kritis
// const requiredEnvVars = [
//   "DB_HOST",
//   "DB_USER",
//   "DB_PASSWORD",
//   "DB_NAME",
//   "PORT",
// ];
// for (const envVar of requiredEnvVars) {
//   if (!process.env[envVar]) {
//     logger.error(`Environment variable ${envVar} tidak terdefinisi!`);
//     process.exit(1);
//   }
// }

// const PORT = process.env.PORT || 4001;

// // Fungsi untuk graceful shutdown
// const gracefulShutdown = async (signal) => {
//   logger.info(`\n${signal} diterima. Menutup server...`);
//   try {
//     // Tutup server
//     const server = app.listen(PORT);
//     server.close(async () => {
//       logger.info("Server berhasil ditutup.");

//       // Tutup koneksi database
//       await dbPool.end();
//       logger.info("Koneksi database ditutup.");
//       process.exit(0);
//     });

//     // Beri waktu 5 detik untuk menutup koneksi
//     setTimeout(() => {
//       logger.error("Waktu habis. Memaksa keluar.");
//       process.exit(1);
//     }, 5000);
//   } catch (err) {
//     logger.error("Error saat shutdown:", err.message);
//     process.exit(1);
//   }
// };

// // Tangkap sinyal untuk graceful shutdown
// process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
// process.on("SIGINT", () => gracefulShutdown("SIGINT"));
// process.on("uncaughtException", (err) => {
//   logger.error("Uncaught Exception:", err.message);
//   gracefulShutdown("uncaughtException");
// });
// process.on("unhandledRejection", (err) => {
//   logger.error("Unhandled Rejection:", err.message);
//   gracefulShutdown("unhandledRejection");
// });

// // Tes koneksi database terlebih dahulu
// dbPool
//   .getConnection()
//   .then((connection) => {
//     logger.info("✅ Koneksi ke database MySQL berhasil!");
//     connection.release();

//     // Baru start server jika koneksi DB berhasil
//     const server = app.listen(PORT, () => {
//       logger.info(`✅ Server berjalan di port: ${PORT}`);
//       logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
//     });

//     // Simpan referensi server untuk graceful shutdown
//     app.set("server", server);
//   })
//   .catch((err) => {
//     logger.error("❌ Gagal terhubung ke database MySQL:", err.message);
//     process.exit(1);
//   });
