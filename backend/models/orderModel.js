/* ./models/orderModel.js */
import db from "../config/db.js";

// Fetch All Orders
export const getAllOrders = async () => {
  const [rows] = await db.query("SELECT * FROM orders ORDER BY id DESC");
  return rows;
};

// Add Order
export const addOrder = async ({
  customer_id,
  customer_name,
  customer_phone,
  quantity,
  type,
  delivery_address,
  delivery_session,
  delivery_date
}) => {
  const [result] = await db.query(
    "INSERT INTO orders (customer_id, customer_name, customer_phone, quantity, type, delivery_address, delivery_session, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [customer_id, customer_name, customer_phone, quantity, type, delivery_address, delivery_session, delivery_date]
  );
  return result;
};

// Update Order
export const updateOrderById = async (id, {
  customer_id,
  customer_name,
  customer_phone,
  quantity,
  type,
  delivery_address,
  delivery_session,
  delivery_date
}) => {
  const [result] = await db.query(
    "UPDATE orders SET customer_id=?, customer_name=?, customer_phone=?, quantity=?, type=?, delivery_address=?, delivery_session=?, delivery_date=? WHERE id=?",
    [customer_id, customer_name, customer_phone, quantity, type, delivery_address, delivery_session, delivery_date, id]
  );
  return result;
};

// Delete Order
export const deleteOrderById = async (id) => {
  const [result] = await db.query("DELETE FROM orders WHERE id=?", [id]);
  return result;
};
