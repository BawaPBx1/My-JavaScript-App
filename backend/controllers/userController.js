import { addUser, getUser, verifyDuplicateUser } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret';

// import UserModel from '../models/userModel.js';
// const { addUser } = UserModel;


export const addUserHandler = async (req, res) => {
  // console.log("User route loaded");
  // console.log("Adding user route:", req.body);
  // return;
  const { firstName, lastName, email, password, acceptTerms } = req.body;

  if (!firstName || !lastName || !email || !password || acceptTerms === undefined) {
    // Send error with status 400 and descriptive message
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const isDuplicate = await verifyDuplicateUser(email);
    console.log("Checking for duplicate user:", isDuplicate);

    if (isDuplicate) {
      // Send error with status 409 and descriptive message
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await addUser({ firstName, lastName, email, password, acceptTerms });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error in addUserHandler:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  // try {
  //   const user = await addUser({ firstName, lastName, email, password, acceptTerms });
  //   res.status(201).json(user);
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to add user' });
  //   // res.status(500).json({ error: error || 'Failed to add user' });
  //   // console.error("Error adding user:", error);
  // }
};

export const getUserHandler = async (req, res) => {
  console.log("getUserHandler called : ", req.body);
  const { email, password } = req.body;
  try {
    const user = await getUser({ email, password });
    // console.log("User found in handler:", user);
    
    // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: '1h',
    });

    // res.status(200).json(user);
    res.status(200).json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    // res.status(500).json({ error: 'Failed to retrieve user' });
    console.error("Error retrieving user:", error.message);
    res.status(401).json({ error: error.message || 'Failed to retrieve user' });
  }
};

