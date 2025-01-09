import express from "express";
import {
  createOrder,
  getOrderByUserId,
  updateOrderById,
  getAllOrders,
} from "../controller/Order.controller.js";

const router = express.Router();

router.get("/own/", getOrderByUserId);
router.get("/", getAllOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrderById);

export default router;
