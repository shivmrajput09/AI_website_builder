import User from "../models/user.model.js";
import Website from "../models/website.model.js";
import { callAI } from "../utils/openrouter.js";
import { MASTER_PROMPT } from "../utils/prompts.js";
import { CREDIT_COST, MAX_PROMPT_LENGTH } from "../utils/constants.js";

// ---------- GENERATE: naya website banao ----------
export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return res.status(400).json({ message: `Prompt must be under ${MAX_PROMPT_LENGTH} characters` });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Credits kam hain to AI call karne se pehle hi roko (paisa bachta hai)
    if (user.credits < CREDIT_COST.GENERATE) {
      return res.status(402).json({ message: "Not enough credits" });
    }

    // AI se website mangwao
    const result = await callAI(MASTER_PROMPT, prompt);
    if (!result) {
      // AI fail hua: credits NAHI kaatenge
      return res.status(502).json({ message: "AI could not generate the website. Please try again." });
    }

    // Database mein save karo
    const website = await Website.create({
      user: user._id,
      title: prompt.trim().slice(0, 40),
      latestCode: result.code,
      conversation: [
        { role: "user", content: prompt },
        { role: "ai", content: result.message || "Your website is ready." },
      ],
    });

    // Credits tabhi kaato jab sab kuch successful ho gaya
    user.credits -= CREDIT_COST.GENERATE;
    await user.save();

    return res.status(201).json({ website, credits: user.credits });
  } catch (error) {
    return res.status(500).json({ message: `Generate error: ${error.message}` });
  }
};

// ---------- ALL: user ki saari websites (dashboard ke liye) ----------
export const getAllWebsites = async (req, res) => {
  try {
    const websites = await Website.find({ user: req.userId })
      .select("title slug deployed createdAt") // poora code mat bhejo, bhaari hota hai
      .sort({ createdAt: -1 });

    return res.status(200).json(websites);
  } catch (error) {
    return res.status(500).json({ message: `Get websites error: ${error.message}` });
  }
};

// ---------- BY ID: ek website (editor ke liye) ----------
export const getWebsiteById = async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).json({ message: "Website not found" });

    // Ownership check: dusre ki website koi aur na dekh paye
    if (website.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    return res.status(200).json(website);
  } catch (error) {
    return res.status(500).json({ message: `Get website error: ${error.message}` });
  }
};