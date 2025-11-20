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
    origin: ["http://localhost:5174", "http://localhost:5173","https://sneha-traders-frontend-1pb4-p9hj7fah7-rachitdeshwals-projects.vercel.app"],
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
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
  Product.find().then((products) => {
    console.log(products);
  });
});
