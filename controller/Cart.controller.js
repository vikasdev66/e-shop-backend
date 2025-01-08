import { Cart } from "../model/Cart.model.js";

export const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    const populatedCart = await Cart.findById(cart._id).populate("product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const cart = await Cart.find({ user: userId }).populate("product");
    console.log(cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
