// dotenv sabse pehle load karna zaroori hai, taaki .env ki values baaki files mein mil sakein
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";   // upar imports mein

const app = express();
const port = process.env.PORT || 8000;

// CORS: sirf hamare frontend ko API use karne do.
// credentials: true zaroori hai, tabhi cookie frontend-backend ke beech aa-ja sakti hai.
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());   // request body (JSON) ko padhne ke liye
app.use(cookieParser());   // cookies ko req.cookies mein laane ke liye

// Routes
app.use("/api/auth", authRouter); // login, logout
app.use("/api/user", userRouter); // current user

// Test route: server chal raha hai ya nahi
app.get("/", (req, res) => res.send("Server is running"));

app.listen(port, () => {
  console.log("Server started on port", port);
  connectDb(); // server start hone ke baad database se connect karo
});