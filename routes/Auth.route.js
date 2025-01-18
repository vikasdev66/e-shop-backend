import express from "express";
import passport from "passport";
import {
  createUser,
  loginUser,
  checkAuth ,
} from "../controller/Auth.controller.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/check", passport.authenticate("jwt"), checkAuth );

export default router;
