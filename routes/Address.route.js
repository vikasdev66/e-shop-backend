import express from "express";
import {
  createAddress,
  getAddressByUserId,
  updateAddressById,
  deleteAddressById,
} from "../controller/Address.controller.js";

const router = express.Router();

router.post("/", createAddress);
router.get("/own", getAddressByUserId);
router.patch("/:id", updateAddressById);
router.delete("/:id", deleteAddressById);

export default router;
