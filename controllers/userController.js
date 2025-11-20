import User from "../models/userSchema.js";

export const getCurrentUser = async (req, res, next) => {
  let id = req.userId;
  console.log(id);
  const result = await User.findById(id).select("-password");
  console.log(result);
  if (!result) {
    return res.status(404).json({ message: "user does not exist" });
  }
  return res.status(201).json(result);
};

export const getAdmin = async (req, res) => {
  try {
    let email = req.adminEmail;
    if (!email) {
      return res.status(404).json({ message: "user does not exist" });
    }
    return res.status(201).json({ role: "Admin" });
  } catch (err) {}
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
