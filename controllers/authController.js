import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import { getToken, getToken1 } from "../models/token.js";

export const logIn = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  let token = await getToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({ message: "Log in successfully" });
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logOut successful" });
  } catch (error) {
    console.log("logOut error");
    return res.status(500).json({ message: `LogOut error ${error}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    console.log(name);
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        isVerified: true,
      });
    }

    let token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error");
    return res.status(500).json({ message: `googleLogin error ${error}` });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // valid for 10 mins
    });

    // Send OTP to email
    await sendEmail(email, "Verify your Email - Sneha Traders", otp);

    res
      .status(200)
      .json({ message: "OTP sent to email for verification", email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    let token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = await getToken1(email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ message: "Log in successfully" });
    }
    return res.status(401).json({ message: "Invalid email and password!" });
  } catch (err) {
    return res.status(504).json({ message: "Server Error" });
  }
};
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = newOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // valid 5 mins
    await user.save();
    await sendEmail(email, "Verify your Email - Sneha Traders", newOtp);
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
