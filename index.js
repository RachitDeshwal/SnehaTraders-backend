import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import User from "./models/userSchema.js";
import Product from "./models/productSchema.js";
import returnRouter from "./routes/returnRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://sneha-traders-frontend.vercel.app","https://sneha-traders-admin.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/returns", returnRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
export default app;
