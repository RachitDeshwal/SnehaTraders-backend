// models/ReturnRequest.js
import mongoose from "mongoose";

const returnRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // URL of image uploaded (if any)
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Refunded"],
      default: "Pending",
    },
    adminNote: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReturnRequest", returnRequestSchema);
