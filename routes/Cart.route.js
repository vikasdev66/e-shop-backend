import express from "express";
import {
  createCart,
  getCartByUserId,
  updateCartById,
  deleteCartById,
} from "../controller/Cart.controller.js";

const router = express.Router();

router.get("/", getCartByUserId);
router.post("/", createCart);
router.patch("/:id", updateCartById);
router.delete("/:id", deleteCartById);

export default router;
