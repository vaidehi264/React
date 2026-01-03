import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/user', userRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});


