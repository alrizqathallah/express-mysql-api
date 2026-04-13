import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import chalk from "chalk";

const logDir = "logs";
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// 1. Transport untuk file (JSON)
const createDailyRotateTransport = (folder, filename, level) =>
  new winston.transports.DailyRotateFile({
    dirname: path.join(logDir, folder),
    filename: `${filename}-%DATE%.json`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level,
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.json(),
    ),
  });

// 2. Format warna untuk Console (Gunakan chalk + colorize)
const colorizeFormat = winston.format.printf(
  ({ level, message, timestamp }) => {
    const colorMap = {
      error: chalk.redBright,
      warn: chalk.yellowBright,
      info: chalk.greenBright,
      debug: chalk.magentaBright,
      default: chalk.gray,
    };
    const color = colorMap[level] || colorMap.default;
    return `${chalk.dim(`[${timestamp}]`)} ${color(level.toUpperCase())}: ${message}`;
  },
);

// 3. Konfigurasi utama
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
  ),
  transports: [
    createDailyRotateTransport("combined", "combined"),
    createDailyRotateTransport("errors", "error", "error"),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // Aktifkan colorize Winston
        colorizeFormat, // Format custom dengan Chalk
      ),
    }),
  ],
});

export default logger;

// import winston from "winston";
// import "winston-daily-rotate-file";
// import path from "path";
// import fs from "fs";
// import chalk from "chalk";

// // =============================================
// // 1. Setup Direktori Log
// // =============================================
// const logDir = "logs";
// const combinedDir = path.join(logDir, "combined");
// const errorDir = path.join(logDir, "errors");

// try {
//   [logDir, combinedDir, errorDir].forEach((dir) => {
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//   });
// } catch (err) {
//   console.error("Gagal membuat direktori log:", err.message);
//   process.exit(1);
// }

// // =============================================
// // 2. Transport untuk File
// // =============================================
// const createDailyRotateTransport = (dirname, filename, level = "info") => {
//   return new winston.transports.DailyRotateFile({
//     dirname,
//     filename: `${filename}-%DATE%.log`, // Ubah ke .log (lebih standar)
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: true,
//     maxSize: "20m",
//     maxFiles: "14d",
//     level,
//     format: winston.format.combine(
//       winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//       winston.format.json(),
//     ),
//   });
// };

// // =============================================
// // 3. Format untuk Console (Warna + Timestamp)
// // =============================================
// const consoleFormat = winston.format.combine(
//   winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//   winston.format.colorize({ all: true }),
//   winston.format.printf(({ level, message, timestamp }) => {
//     const colorMap = {
//       error: chalk.bgRed.white,
//       warn: chalk.bgYellow.black,
//       info: chalk.bgGreen.white,
//       debug: chalk.bgMagenta.white,
//       http: chalk.bgCyan.black,
//       default: chalk.white,
//     };
//     const color = colorMap[level] || colorMap.default;
//     return `${chalk.dim(`[${timestamp}]`)} ${color(` ${level.toUpperCase()} `)} ${message}`;
//   }),
// );

// // =============================================
// // 4. Konfigurasi Utama Logger
// // =============================================
// const logger = winston.createLogger({
//   level: process.env.NODE_ENV === "development" ? "debug" : "info",
//   format: winston.format.combine(
//     winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//     winston.format.errors({ stack: true }),
//     winston.format.splat(),
//     winston.format.json(),
//   ),
//   defaultMeta: { service: "express-mysql-api" },
//   transports: [
//     // File: Combined logs (semua level)
//     createDailyRotateTransport(combinedDir, "combined"),

//     // File: Error logs (hanya error)
//     createDailyRotateTransport(errorDir, "error", "error"),

//     // Console: Hanya untuk development
//     new winston.transports.Console({
//       level: "debug", // Hanya tampilkan debug ke atas di console
//       format: consoleFormat,
//     }),
//   ],
//   exitOnError: false, // Jangan keluar jika error di logger
// });

// // =============================================
// // 5. Middleware untuk Morgan (opsional)
// // =============================================
// logger.stream = {
//   write: (message) => {
//     logger.info(message.trim());
//   },
// };

// export default logger;
