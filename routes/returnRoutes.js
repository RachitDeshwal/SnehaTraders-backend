import express from "express";
import {
  allReturns,
  cancelReturnRequest,
  createReturnRequest,
  getUserReturnRequests,
  updateReturnStatus,
} from "../controllers/returnController.js";
import isAuth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
const returnRouter = express.Router();
returnRouter.post("/", isAuth, createReturnRequest);
returnRouter.post("/requests", isAuth, getUserReturnRequests);
returnRouter.put("/:id", adminAuth, updateReturnStatus);
returnRouter.get("/allreturns", adminAuth, allReturns);
returnRouter.put("/update/:id", adminAuth, updateReturnStatus);
returnRouter.delete("/cancel/:id", isAuth, cancelReturnRequest);
export default returnRouter;
