import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ---------- GOOGLE LOGIN ----------
// Frontend Firebase se Google ka data lekar yahan bhejta hai.
export const googleAuth = async (req, res) => {
  try {
    // Frontend se aaya hua data: naam, email, photo
    const { name, email, avatar } = req.body;

    // Naam ya email nahi aaya to 400 (Bad Request)
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    // Is email ka user pehle se hai ya nahi, dekho
    let user = await User.findOne({ email });

    // Nahi hai to naya user banao (credits default 100 model se mil jate hain)
    if (!user) {
      user = await User.create({ name, email, avatar });
    }

    // JWT token banao: andar user ki id, 7 din baad expire
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Development aur production mein cookie ki settings alag hoti hain
    const isProd = process.env.NODE_ENV === "production";

    // Token ko cookie mein set karo
    res.cookie("token", token, {
      httpOnly: true,                    // JS se cookie nahi padhi ja sakti (XSS se bachav)
      secure: isProd,                    // production mein sirf HTTPS par chalegi
      sameSite: isProd ? "none" : "lax", // alag domain (frontend/backend) ke liye production mein "none"
      maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 din (milliseconds mein)
    });

    // User ka data frontend ko wapas bhejo
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Google auth error: ${error.message}` });
  }
};

// ---------- LOGOUT ----------
// Cookie hata do, matlab user logout ho gaya.
export const logout = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  // clearCookie ke options wahi hone chahiye jo cookie set karte time the,
  // warna browser cookie delete nahi karta.
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logged out" });
};