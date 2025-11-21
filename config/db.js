import mongoose from "mongoose";

let isConnected = false; // Track connection status

export default async function connectDB() {
  if (isConnected) {
    // If already connected, reuse existing connection
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB Connected (Serverless)");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
}
