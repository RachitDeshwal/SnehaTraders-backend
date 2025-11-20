import express from "express";
import {
  addToCart,
  getCartData,
  updateCart,
} from "../controllers/cartController.js";
import isAuth from "../middleware/isAuth.js";

const cartRoutes = express.Router();
cartRoutes.post("/get", isAuth, getCartData);
cartRoutes.post("/add", isAuth, addToCart);
cartRoutes.post("/update", isAuth, updateCart);

export default cartRoutes;
