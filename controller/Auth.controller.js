import { User } from "../model/User.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sanitizeUser } from "../services/common.js";

export const createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = await User.create({
          ...req.body,
          password: hashedPassword,
          salt,
        });
        req.login(user, (error) => {
          if (error) {
            res.status(400).json({ message: error.message });
          } else {
            // Create a token
            const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: user?.id, role: user?.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

export const checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
