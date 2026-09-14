import { RestockModel } from "../models/restockModel.js";

export const RestockController = {
  async create(req, res) {
    try {
      const restock = await RestockModel.create(req.body);
      res.status(201).json({
        message: "Restock berhasil dicatat dan stok produk telah diperbarui",
        data: restock
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const restocks = await RestockModel.getAll();
      res.json(restocks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};