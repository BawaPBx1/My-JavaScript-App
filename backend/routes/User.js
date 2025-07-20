import express from 'express';
import { addUserHandler, getUserHandler } from '../controllers/userController.js';
import { logoutUserHandler } from '../controllers/userAuthenticateController.js';
import { forgotPasswordHandler, resetPasswordHandler } from '../controllers/forgotPasswordController.js';

const router = express.Router();

router.post('/register', addUserHandler);
router.post('/login', getUserHandler);
router.post('/logout', logoutUserHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/reset-password/:token', resetPasswordHandler);

export default router;

// // import { addUser, getUsers, getUserById, updateUser, deleteUser } from '../models/userModel.js';
// import { addUser, getUser } from '../models/userModel.js';
// import express from 'express';
// import bcrypt from 'bcryptjs';

// const router = express.Router();

// export const addUserHandler = async (req, res) => {
//   const { firstName, lastName, email, password, acceptTerms } = req.body;
//   try {
//     const user = await addUser({ firstName, lastName, email, password, acceptTerms });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add user' });
//   }
// };

// export const getUserHandler = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await getUser({ email, password });
//     res.status(200).json({
//       message: "Login successful!",
//       user,
//     });
//   } catch (error) {
//     console.error("Error retrieving user:", error.message);
//     res.status(401).json({ error: error.message || 'Failed to retrieve user' });
//   }
// };
