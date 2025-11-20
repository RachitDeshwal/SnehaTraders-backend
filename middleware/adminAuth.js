import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "does not have token" });
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "User not authorized" });
    }
    req.adminEmail = process.env.ADMIN_EMAIL;
    next();
  } catch (err) {
    return res.status(401).json({ message: "User not authorized" });
  }
};
export default adminAuth;
