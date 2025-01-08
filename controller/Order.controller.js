import { Order } from "../model/Order.model.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const populatedOrder = await Order.findById(order._id).populate("address");
    res.status(200).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const order = await Order.find({ user: userId }).populate("address");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
