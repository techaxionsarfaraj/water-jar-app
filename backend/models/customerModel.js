/* ./models/customerModel.js */
import db from "../config/db.js";

// Fetch All Customers
export const getAllCustomers = async () => {
  const [rows] = await db.query("SELECT * FROM customers");
  return rows;
};

// Add Customer
export const addCustomer = async ({ name, phone, address, email }) => {
  const [result] = await db.query(
    "INSERT INTO customers (name, phone, address, email) VALUES (?, ?, ?, ?)",
    [name, phone, address, email]
  );
  return result;
};

// Update Customer
export const updateCustomerById = async (id, { name, phone, address, email }) => {
  const [result] = await db.query(
    "UPDATE customers SET name=?, phone=?, address=?, email=? WHERE id=?",
    [name, phone, address, email, id]
  );
  return result;
};

// Delete Customer
export const deleteCustomerById = async (id) => {
  const [result] = await db.query("DELETE FROM customers WHERE id=?", [id]);
  return result;
};
