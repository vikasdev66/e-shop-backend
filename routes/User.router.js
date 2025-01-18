import express from "express";
import {
  fetchUserById,
  updateUserById,
} from "../controller/User.controller.js";

const router = express.Router();

router.get("/own", fetchUserById);
router.patch("/:id", updateUserById);

export default router;
