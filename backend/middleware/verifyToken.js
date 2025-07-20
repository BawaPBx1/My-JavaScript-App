import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔎 Token must be in format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("🛑 No token provided.");
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // ✅ Proceed to protected route
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    // localStorage.getItem("token");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};