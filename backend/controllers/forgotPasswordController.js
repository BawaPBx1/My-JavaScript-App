import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { updateUser } from '../models/userModel.js';
import { verifyUser } from "../models/forgotPasswordModel.js";
import { verifyDuplicateUser, getUsers } from "../models/userModel.js";

export const forgotPasswordHandler = async (req, res) => {
  console.log("checking the forgotPasswordHandler : ", req.body);
  const { email } = req.body;
  if(!email) return;
  const user = await verifyUser({ email });
  console.log("Email received for password reset:", email, user);
  try {
    const user = await verifyUser({ email });
    res.status(201).json(user);
  } catch (error) {
    // res.status(500).json({ error: 'Failed to verify user' });
    res.status(500).json({ error: error || 'Failed to verify user' });
  }
}

export const resetPasswordHandler = async (req, res) => {
  console.log("checking the resetPasswordHandler : ", req.body);
  const { token } = req.params;
  const { email, password } = req.body;

  const getUser = await getUsers(email);
  if (!getUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (getUser.passwordRecoveryToken !== token) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    ...getUser,
    password: hashedPassword,
    passwordRecoveryToken: null,
    updated_at: new Date().toISOString(),
  };

  const updatedUser = await updateUser(getUser.id, newUser);

  console.log("Resetting password for token:", token, "with new password:", password, "for user:", email, "getUser:", getUser, "updatedUser:", updatedUser);
  // try {
  //   const user = await verifyUser({ email });
  //   res.status(201).json(user);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to verify user' });
  // }
}