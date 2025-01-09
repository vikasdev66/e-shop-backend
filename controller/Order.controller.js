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

export const getAllOrders = async (req, res) => {
  try {
    let query = Order.find({ deleted: { $ne: true } });
    let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalOrdersQuery.countDocuments().exec();
    console.log({ totalDocs });

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const docs = await query.populate("address");
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
