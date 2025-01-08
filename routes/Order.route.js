import express from "express";
import {
  createOrder,
  getOrderByUserId,
  updateOrderById,
} from "../controller/Order.controller.js";

const router = express.Router();

router.get("/", getOrderByUserId);
router.post("/", createOrder);
router.patch("/:id", updateOrderById);

export default router;
