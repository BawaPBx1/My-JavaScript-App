import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

export const logoutUserHandler = async (req, res) => {
  console.log("checking the logoutUserHandler : ", req.body);
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logout successful!",
    // message: "Logout successful using the JWT!",
  });
}