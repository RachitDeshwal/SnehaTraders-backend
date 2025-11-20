// controllers/returnController.js
import ReturnRequest from "../models/returnRequest.js";
import Order from "../models/orderSchema.js";
import returnRequest from "../models/returnRequest.js";

// 🔍 2. Get all return requests for a user

// 🧑‍💼 3. Admin updates return status
export const updateReturnStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    const updated = await ReturnRequest.findByIdAndUpdate(
      id,
      { status, adminNote },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Return request updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// for all Return
export const allReturns = async (req, res) => {
  try {
    const returns = await returnRequest.find({});
    return res.status(200).json(returns);
  } catch (err) {
    return res.status(501).json({ message: "Error getting in all returns " });
  }
};
export const createReturnRequest = async (req, res) => {
  try {
    const userId = req.userId; // Authenticated user ID
    const { orderId, productId, reason, images } = req.body;

    // Validate required fields
    if (!reason || reason.trim() === "") {
      return res.status(400).json({ message: "Reason is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const orderDate = new Date(order.date);
    const now = new Date();
    const diffDays = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      return res
        .status(400)
        .json({ message: "Return period expired (7 days limit)" });
    }

    // Check if return request already exists for this order/product/user
    const existingRequest = await ReturnRequest.findOne({
      order: orderId,
      product: productId,
      user: userId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Return already requested" });
    }

    const newRequest = await ReturnRequest.create({
      user: userId,
      order: orderId,
      product: productId,
      reason,
      images: images || [], // Optional images URLs array
    });

    res
      .status(201)
      .json({ message: "Return request created", request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const getUserReturnRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const requests = await ReturnRequest.find({ user: userId })
      .populate("product", "name image1")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch return requests" });
  }
};
export const cancelReturnRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const request = await ReturnRequest.findOne({ _id: id, user: userId });
    if (!request) {
      return res.status(404).json({ message: "Return request not found" });
    }
    await ReturnRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Return request canceled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to cancel return request" });
  }
};
