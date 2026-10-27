// Express aur Clerk auth middleware import kar rahe hain
import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import Project from '../models/Project.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware: Ye line ensure karti hai ki is router ke saare APIs 
// sirf tabhi access ho sakein jab user login ho (Security ke liye).
router.use(ClerkExpressRequireAuth());

// ==========================================
// 1. CREATE PROJECT API (POST /api/projects)
// ==========================================
// Jab user dashboard par "Create New Project" button dabayega tab ye call hoga
router.post('/', async (req, res) => {
  try {
    // req.auth.userId mein hume Clerk se logged-in user ki ID mil jayegi
    const clerkId = req.auth.userId; 
    
    // Database mein check kar rahe hain ki ye user exist karta hai ya nahi
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: 'User not found in DB' });

    // Project schema ke hisaab se naya data structure ready kar rahe hain
    const newProject = new Project({
      userId: user._id, // Hamare User collection ki _id
      projectName: req.body.projectName || 'Untitled AI Project', // Frontend se naam aayega
      promptHistory: [], // Shuru mein prompt history khali hogi
      generatedCodeStructure: {} // Shuru mein code structure bhi khali hoga
    });

    // Naye project ko MongoDB mein save kar diya
    await newProject.save();
    
    // Frontend ko 201 (Created) status ke sath project ka data bhej diya
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// ==========================================
// 2. GET ALL PROJECTS API (GET /api/projects)
// ==========================================
// Jab user dashboard open karega toh uske purane saare projects dikhane ke liye
router.get('/', async (req, res) => {
  try {
    // Wahi same logic: Pehle user ko identify karo
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: 'User not found in DB' });

    // Is user ke saare projects dhoondho. 
    // sort({ createdAt: -1 }) se latest project sabse upar list hoga.
    const projects = await Project.find({ userId: user._id }).sort({ createdAt: -1 });
    
    // Fetch kiye hue projects frontend ko bhej do
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Is router ko export kar rahe hain taaki main server (index.js) isko use kar sake
export default router;
