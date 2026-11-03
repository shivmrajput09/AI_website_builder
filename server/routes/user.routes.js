import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

// GET /api/user/current
// Pehle isAuth chalega (login check), uske baad hi getCurrentUser chalega.
userRouter.get("/current", isAuth, getCurrentUser);

export default userRouter;