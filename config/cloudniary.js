import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { deflate } from "zlib";
const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_API_SECRET,
  });
  try {
    if (!filePath) {
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult.secure_url;
  } catch (err) {
    fs.unlinkSync(filePath);
    console.log(err);
  }
};
export default uploadOnCloudinary;
