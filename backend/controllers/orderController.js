/* ./controllers/orderController.js */
import {
  getAllOrders,
  addOrder,
  updateOrderById,
  deleteOrderById
} from "../models/orderModel.js";

// Get all orders
export const fetchOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create order
export const createOrder = async (req, res) => {
  try {
    const result = await addOrder(req.body);
    res.json({ id: result.insertId, message: "Order added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await updateOrderById(id, req.body);
    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteOrderById(id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
