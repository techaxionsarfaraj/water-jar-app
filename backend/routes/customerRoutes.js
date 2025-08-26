/* routes/customerRoutes.js */
import express from "express";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", fetchCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);


// GET /api/customers?search=abc
router.get('/search', async (req, res) => {
  const search = (req.query.search || '').trim()

  try {
    if (search.length >= 3) {
      // return only matching customers
      const [rows] = await db.query(
        `SELECT id, name, phone, address
         FROM customers
         WHERE name LIKE ? OR phone LIKE ?
         ORDER BY name ASC
         LIMIT 10`,
        [`%${search}%`, `%${search}%`]
      )
      return res.json(rows)
    }

    // If search not provided or less than 3 chars → return empty list
    return res.json([])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch customers' })
  }
})



export default router;
