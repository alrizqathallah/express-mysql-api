import morgan from "morgan";
import path from "path";
import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";
import logger from "../configs/logger.js";

// =============================================
// 1. Setup Direktori Log
// =============================================
const accessLogDir = path.join("logs", "access");

// Pastikan direktori ada (dengan error handling)
try {
  if (!fs.existsSync(accessLogDir)) {
    fs.mkdirSync(accessLogDir, { recursive: true });
  }
} catch (err) {
  console.error("Gagal membuat direktori log:", err.message);
  process.exit(1); // Hentikan aplikasi jika gagal membuat direktori
}

// =============================================
// 2. Konfigurasi Winston Logger untuk Access Log
// =============================================
const accessLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(), // Simpan sebagai JSON untuk analisis mudah
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: accessLogDir,
      filename: "access-%DATE%.json", // Format JSON untuk analisis
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  // Tangani error jika gagal menulis log
  exitOnError: false,
});

// =============================================
// 3. Format Morgan (IP - Method - URL - Status - Size - Time)
// =============================================
const morganFormat =
  ":remote-addr - :method :url :status - :res[content-length] bytes - :response-time ms";

// =============================================
// 4. Middleware Morgan: Arahkan ke Winston
// =============================================
const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      try {
        // Bersihkan pesan (hapus newline) dan simpan ke Winston
        const cleanedMessage = message.trim();
        accessLogger.info(cleanedMessage);
        logger.info(cleanedMessage);
      } catch (err) {
        console.error("Gagal menulis log access:", err.message);
        logger.error("Gagal menulis log access:", err.message);
      }
    },
  },
  // Nonaktifkan output default Morgan ke console
  immediate: false,
});

export default morganMiddleware;

// import morgan from "morgan";
// import path from "path";
// import fs from "fs";
// import logger from "../configs/logger.js";

// // =============================================
// // 1. Setup Direktori Log (jika belum ada)
// // =============================================
// const accessLogDir = path.join("logs", "access");

// try {
//   if (!fs.existsSync(accessLogDir)) {
//     fs.mkdirSync(accessLogDir, { recursive: true });
//   }
// } catch (err) {
//   logger.error("Gagal membuat direktori log access:", err.message);
//   process.exit(1);
// }

// // =============================================
// // 2. Format Morgan (IP - Method - URL - Status - Size - Time)
// // =============================================
// const morganFormat =
//   ":remote-addr - :method :url :status - :res[content-length] bytes - :response-time ms";

// // =============================================
// // 3. Middleware Morgan: Arahkan ke Winston
// // =============================================
// const morganMiddleware = morgan(morganFormat, {
//   stream: {
//     write: (message) => {
//       try {
//         const cleanedMessage = message.trim();
//         logger.info(cleanedMessage, { meta: { source: "morgan" } });
//       } catch (err) {
//         logger.error("Gagal menulis log access:", err.message);
//       }
//     },
//   },
//   immediate: false, // Nonaktifkan output default Morgan
// });

// export default morganMiddleware;
