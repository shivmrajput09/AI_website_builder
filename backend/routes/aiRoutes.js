import express from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Gemini AI ko API key ke sath initialize kar rahe hain
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Security ke liye is route ko bhi protect kar diya
router.use(ClerkExpressRequireAuth());

// AI se code generate karwane wali API (POST /api/ai/generate)
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // System instruction: AI ko batana ki use sirf JSON format mein Sandpack ke liye code dena hai
    const systemPrompt = `
      You are an expert React developer. 
      Generate a React component based on this prompt: "${prompt}".
      Return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json.
      The JSON object must have this exact structure:
      {
        "/App.js": "import React from 'react';\\nexport default function App() { ... }",
        "/styles.css": "body { ... }"
      }
    `;

    // Gemini 1.5 Flash model use kar rahe hain (fast aur efficient)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // AI ko prompt bhej kar response ka wait kar rahe hain
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    // AI ke response ko string se real JSON object mein convert kar rahe hain
    const generatedCodeJSON = JSON.parse(responseText.trim());

    // Frontend ko generated code bhej diya
    res.status(200).json({ files: generatedCodeJSON });

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate code from AI" });
  }
});

export default router;