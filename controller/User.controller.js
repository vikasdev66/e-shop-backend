import { User } from "../model/User.model.js";

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "id name email role");
    res.status(200).json(user);
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
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
