import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendResetEmail } from "../middleware/emailNodeMailer.js";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

export const verifyUser = async ({ email }) => {
  const user = await db("users").select("id", "firstName", "email").where({ email }).first();
  if (!user) {
    throw new Error("User not found");
  }

  // const resetToken = jwt.sign(user, '1h');
  const resetToken = jwt.sign(user, JWT_SECRET, {
    expiresIn: '1h',
  });
  // const user = await db("users").select("id", "firstName", "email").where({ email }).first();
  const tokenStored = await db("users").where({ email }).update({ passwordRecoveryToken: resetToken });
  let emailSent;
  if (tokenStored) {
    emailSent = await sendResetEmail(user.email, user.firstName, resetToken);
    
    // console.log("checking the emailSent", emailSent);
  }

  // res.json({ message: "Reset email sent" });
  return emailSent;


  // return user;

};