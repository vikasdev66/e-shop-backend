import { Address } from "../model/Address.model.js";

export const createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = Address.find({ userId: userId });
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndDelete(id);
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
