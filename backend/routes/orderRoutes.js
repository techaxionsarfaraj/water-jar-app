/* routes/orderRoutes.js */
import express from "express";
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", fetchOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
