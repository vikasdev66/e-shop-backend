import express from "express";
import {
  createProduct,
  getProductById,
  fetchAllProducts,
  updateProductById,
} from "../controller/Product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", fetchAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);

export default router;
