import uploadOnCloudinary from "../config/cloudniary.js";
import Product from "../models/productSchema.js";

export const addProduct = async (req, res) => {
  try {
    let { description, category, subCategory, name, bestseller, price, sizes } =
      req.body;

    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);
    let image4 = await uploadOnCloudinary(req.files.image4[0].path);
    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image1,
      image2,
      image3,
      image4,
      date: Date.now(),
    };
    const product = await Product.create(productData);
    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export const listProduct = async (req, res) => {
   console.log("list product called");
  try {
    const product = await Product.find({});
    return res.status(201).json(product);
  } catch (err) {
    return res.status(501).json({ message: "list product error" });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findByIdAndDelete(id);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(501).json({ message: "remove product error" });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
