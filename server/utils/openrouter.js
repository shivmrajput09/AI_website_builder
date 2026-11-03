import axios from "axios";
import extractJson from "./extractJson.js";

// AI ko call karta hai aur { message, code } wapas deta hai.
// Invalid JSON aaye to 1 baar auto-retry karta hai.
export const callAI = async (systemPrompt, userContent) => {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat", // model badalna ho to sirf ye string badlo
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
        timeout: 120000, // AI slow ho sakta hai, 2 minute tak ruko
      }
    );

    const raw = res.data?.choices?.[0]?.message?.content;
    const parsed = extractJson(raw);

    // Sahi format mein mila to return
    if (parsed && parsed.code) return parsed;
  }

  // Dono baar fail hua
  return null;
};