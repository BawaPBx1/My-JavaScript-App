import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sendResetEmail } from "../middleware/emailNodeMailer.js";
import dotenv from 'dotenv';
dotenv.config();

export const verifyUser = async ({ email }) => {
  const user = await db("users").select("id", "firstName", "email").where({ email }).first();
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = jwt.sign({ id: user._id }, '1h');
  const emailSent = await sendResetEmail(user.email, user.firstName, resetToken);

  console.log("checking the emailSent", emailSent);

  // res.json({ message: "Reset email sent" });
  return emailSent;


  // return user;

};