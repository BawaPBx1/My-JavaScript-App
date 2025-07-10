import { verifyUser } from "../models/forgotPasswordModel.js";

export const forgotPasswordHandler = async (req, res) => {
  console.log("checking the forgotPasswordHandler : ", req.body);
  const { email } = req.body;
  try {
    const user = await verifyUser({ email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify user' });
  }
}