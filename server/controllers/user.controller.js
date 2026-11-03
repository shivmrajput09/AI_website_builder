import User from "../models/user.model.js";

// Logged-in user ka data return karta hai.
// Frontend isse app load hone par call karta hai (refresh ke baad bhi login rakhne ke liye).
export const getCurrentUser = async (req, res) => {
  try {
    // req.userId humein isAuth middleware se mili hai
    const user = await User.findById(req.userId);

    // Token sahi tha par user DB mein nahi mila (jaise delete ho gaya) -> 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // User ka poora data bhej do (name, email, avatar, credits, plan)
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get user error: ${error.message}` });
  }
};