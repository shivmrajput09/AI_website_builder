import express from "express";
import { googleAuth, logout } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// POST /api/auth/google -> Google se login / signup
authRouter.post("/google", googleAuth);

// GET /api/auth/logout -> logout
// isAuth jaan-boojhkar nahi lagaya, taaki expire token wala user bhi logout kar sake.
authRouter.get("/logout", logout);

export default authRouter;