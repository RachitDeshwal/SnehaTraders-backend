import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "../config/db.js";
import authRouter from "../routes/authRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import userRoute from "../routes/userRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import returnRouter from "../routes/returnRoutes.js";

dotenv.config();

const app = express();

// ⭐ Must disable Express' default ETag to avoid caching on serverless
app.disable("etag");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://sneha-traders-frontend.vercel.app",
      "https://sneha-traders-admin.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ⭐ Important: call DB only once
await connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/returns", returnRouter);

// ⭐ REQUIRED FOR VERCEL SERVERLESS
export default function handler(req, res) {
  return app(req, res);
}
