import { Product } from "../model/Product.model.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    let query = Product.find({});
    let totalProductsQuery = Product.find({});
    if (req.query.category) {
      query = query.find({ category: req.query.category });
      totalProductsQuery = totalProductsQuery.find({
        category: req.query.category,
      });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
      totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }

    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductsQuery.countDocuments().exec();

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
