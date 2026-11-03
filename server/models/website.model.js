import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    // Ye website kis user ki hai
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    // AI ka banaya hua poora HTML code
    latestCode: { type: String, required: true },
    // Chat history: { role: "user" | "ai", content, timestamp }
    conversation: [
      {
        role: { type: String, enum: ["user", "ai"] },
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    deployed: { type: Boolean, default: false },
    // sparse: jin websites ka slug nahi hai wo unique check mein nahi gine jayenge
    slug: { type: String, unique: true, sparse: true },
    deployUrl: { type: String },
  },
  { timestamps: true }
);

const Website = mongoose.model("Website", websiteSchema);
export default Website;