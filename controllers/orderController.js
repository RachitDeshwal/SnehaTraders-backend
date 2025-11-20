import User from "../models/userSchema.js";
import Order from "../models/orderSchema.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const currency = "inr";
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const orders = await Order.find({ userId: userId });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

import crypto from "crypto";
import e from "express";

export const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      amount,
      address,
    } = req.body;
    const userId = req.userId;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Signature verified
      const orderData = {
        items,
        amount,
        address,
        payment: true,
        paymentMethod: "online",
        userId,
        date: Date.now(),
      };

      const newOrder = new Order(orderData);
      await newOrder.save();

      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res
        .status(200)
        .json({ message: "Payment successful", orderId: newOrder._id });
    } else {
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// for admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(501).json({ message: "Error getting in all orders" });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(201).json({ message: "Order updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Order not updated successfully" });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
