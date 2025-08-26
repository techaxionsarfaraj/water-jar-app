// ./models/stockModel.js

import db from "../config/db.js"; // Assumes you have a db.js file exporting a MySQL pool/connection

export const getAllStockItems = () => {
  return db.query("SELECT * FROM stock_items");
};

export const insertStockItem = ({
  type,
  color,
  quantity,
  delivered_jars,
  remaining_jars,
  total_jars,
}) => {
  return db.query(
    `INSERT INTO stock_items (type, color, quantity, delivered_jars, remaining_jars, total_jars) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [type, color, quantity, delivered_jars, remaining_jars, total_jars]
  );
};

export const updateStockItem = ({ id, type, color, quantity }) => {
  return db.query(
    "UPDATE stock_items SET type = ?, color = ?, quantity = ? WHERE id = ?",
    [type, color, quantity, id]
  );
};

export const deleteStockItem = (id) => {
  const sql = "DELETE FROM stock_items WHERE id = ?";
  return db.query(sql, [id]);
};
