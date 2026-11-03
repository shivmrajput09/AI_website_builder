import jwt from "jsonwebtoken";

// Ye middleware "gatekeeper" ki tarah kaam karta hai.
// Jo bhi route isAuth use karega, wahan sirf logged-in user hi ja payega.
const isAuth = (req, res, next) => {
  try {
    // Login ke time server ne cookie mein "token" set kiya tha.
    // cookie-parser ki wajah se wo req.cookies mein mil jata hai.
    const token = req.cookies.token;

    // Token hi nahi hai matlab user logged-in nahi hai -> 401 (Unauthorized)
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Token verify karo (JWT_SECRET se check hota hai ki token asli hai ya nakli).
    // Sahi hone par token ke andar jo data dala tha ({ id: user._id }) wo mil jata hai.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ki id request object mein rakh do,
    // taaki aage controller mein req.userId se use kar sakein.
    req.userId = decoded.id;

    // Sab sahi hai, ab request ko agle step (controller) par bhej do.
    next();
  } catch (error) {
    // Token galat ya expire ho gaya (7 din baad) -> 401
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;