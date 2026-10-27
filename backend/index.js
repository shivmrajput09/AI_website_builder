import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Protected Route Example
app.get('/api/protected', ClerkExpressRequireAuth(), (req, res) => {
  res.json({ message: "Success!", userId: req.auth.userId });
});

app.listen(5000, () => console.log('Server running on port 5000'));