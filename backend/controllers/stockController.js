// ./controllers/stockController.js

import {
  getAllStockItems,
  insertStockItem,
  updateStockItem,
  deleteStockItem,
} from "../models/stockModel.js";

// GET
export const getAllStock = async (req, res) => {
  try {
    const [rows] = await getAllStockItems();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
export const addStock = async (req, res) => {
  try {
    const {
      type,
      color,
      quantity,
      delivered_jars,
      remaining_jars,
      total_jars,
    } = req.body;

    // const image = req.file ? req.file.filename : null;

    await insertStockItem({
      type,
      color,
      quantity,
      // image,
      delivered_jars,
      remaining_jars,
      total_jars,
    });

    res.json({ message: "Stock added successfully" });
  } catch (err) {
    console.error("Add stock error:", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT
export const updateStock = async (req, res) => {
  const { id } = req.params;
  const { type, color, quantity } = req.body;

  try {
    await updateStockItem({ id, type, color, quantity });
    res.json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStockItem(id);
    res.json({ message: "Stock deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
