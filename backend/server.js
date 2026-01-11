// import "dotenv/config";
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import morgan from "morgan";
// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/auth.js";

// const app = express();

// const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// app.use(
//   cors({
//     origin: ORIGIN,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("dev"));

// app.get("/api/health", (_req, res) => {
//   res.json({ ok: true, timestamp: new Date().toISOString() });
// });

// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("DB connection error:", err);
//     process.exit(1);
//   });

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import authRoutes from "./routes/authRoutes.js";
import { ConnectDB } from "./config/db.js";
import kycRoutes from "./routes/kyc.js";
import userRoutes from "./routes/user.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
      });
    }
  }

  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/user", userRoutes);
// MongoDB connect
ConnectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
