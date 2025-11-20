import express from "express";

import isAuth from "../middleware/isAuth.js";
import {
  getAdmin,
  getCurrentUser,
  getUserById,
} from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";
const userRoute = express.Router();
userRoute.post("/getcurrentuser", isAuth, getCurrentUser);
userRoute.post("/getadmin", adminAuth, getAdmin);
userRoute.get("/get/:id", adminAuth, getUserById);
export default userRoute;
