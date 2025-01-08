import { User } from "../model/User.model.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "invalid credentials" });
    } else if (user.password === req.body.password) {
      res
        .status(200)
        .json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
