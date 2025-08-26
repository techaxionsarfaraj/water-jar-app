/* ./controllers/customerController.js */
import {
  getAllCustomers,
  addCustomer,
  updateCustomerById,
  deleteCustomerById,
} from "../models/customerModel.js";

// Get all customers
export const fetchCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create customer
export const createCustomer = async (req, res) => {
  try {
    const result = await addCustomer(req.body);
    res.json({ id: result.insertId, message: "Customer added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await updateCustomerById(id, req.body);
    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCustomerById(id);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
