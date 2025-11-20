import express from "express";
import {
  adminLogin,
  googleLogin,
  logIn,
  logOut,
  registerUser,
  resendOtp,
  verifyOtp,
} from "../controllers/authController.js";
const authRouter = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/googlelogin", googleLogin);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);
authRouter.post("/adminlogin", adminLogin);
authRouter.post("/resend-otp", resendOtp);
export default authRouter;
