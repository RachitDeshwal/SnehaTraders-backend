import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique file name
  },
});

let upload = multer({ storage });
export default upload;
