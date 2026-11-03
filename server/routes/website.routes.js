import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { generateWebsite, getAllWebsites, getWebsiteById } from "../controllers/website.controller.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.get("/all", isAuth, getAllWebsites);   // "/:id" se PEHLE rakhna zaroori hai
websiteRouter.get("/:id", isAuth, getWebsiteById);

export default websiteRouter;