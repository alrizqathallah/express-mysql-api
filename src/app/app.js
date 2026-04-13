import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import logRequest from "./middlewares/logs.js";
import userRouter from "./routes/user.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morganMiddleware);
app.use(logRequest);

// Routes
app.use("/api/users", userRouter);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware (untuk error yang tidak tertangani)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
    error: "Internal Server Error",
  });
});

export default app;
