// ./server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import customerRoutes from "./routes/customerRoutes.js";
import stockRoutes  from './routes/stockRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Active Routes
app.use("/api/customers", customerRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/orders', orderRoutes);


// ⬇️ Add this line just BEFORE your routes (very important)
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
