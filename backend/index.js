import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import cors from 'cors'; // Frontend ko connect karne ke liye
import mongoose from 'mongoose'; // Database connect karne ke liye
import projectRoutes from './routes/projectRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();
const app = express();

// 1. Middlewares
app.use(cors()); // Frontend ki requests ko block hone se bachata hai
app.use(express.json()); // Frontend se bheje gaye JSON data ko parse karta hai
// AI Code Generation Routes
app.use('/api/ai', aiRoutes);

// 2. Project Routes (CRUD APIs)
app.use('/api/projects', projectRoutes);

// 3. Testing Route (Optional - check karne ke liye)
app.get('/api/protected', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: "Success!", userId: req.auth.userId });
});

// 4. MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

// 5. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));