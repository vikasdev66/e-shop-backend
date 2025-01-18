import { User } from "../model/User.model.js";
import { removeUserId } from "../services/common.js";

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id, "name email role");
    res.status(200).json(removeUserId(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(removeUserId(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
