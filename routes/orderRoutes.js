import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  createRazorpayOrder,
  getOrderById,
  updateStatus,
  userOrders,
  verifyRazorpay,
} from "../controllers/orderController.js";
const orderRoutes = express.Router();
import isAuth from "../middleware/isAuth.js";
//for user
orderRoutes.post("/userorder", isAuth, userOrders);
orderRoutes.post("/create-razorpay", isAuth, createRazorpayOrder);
orderRoutes.post("/verify", isAuth, verifyRazorpay);
// for admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);
orderRoutes.get("/get/:id", adminAuth, getOrderById);
export default orderRoutes;
