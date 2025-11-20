import User from "../models/userSchema.js";
export const addToCart = async (req, res) => {
  try {
    let { itemId, size } = req.body;
    let userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(400).json({ message: "user does not exists" });
    }
    let cartData = userData.cartData || {};
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(200).json({ message: "Add to Cart Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error occur in add to cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    let { itemId, size, quantity } = req.body;
    let userData = await User.findById(req.userId);
    let cartData = userData.cartData;
    cartData[itemId][size] = quantity;
    await User.findByIdAndUpdate(req.userId, { cartData });
    return res.status(200).json({ message: "Update cart successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error occur in update cart" });
  }
};
export const getCartData = async (req, res) => {
  try {
    let userData = await User.findById(req.userId);
    let cartData = userData.cartData;
    console.log("Cart Data:", cartData);
    return res.status(200).json(cartData);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error in access cartData" });
  }
};
