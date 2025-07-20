import express from 'express';
// const app = express();
const router = express.Router();

import { verifyToken } from "../middleware/verifyToken.js";

router.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!`, user: req.user });
  // console.log(`Welcome, ${req.user.email}!`);
});
// router.get("/dashboard", verifyToken, (req, res) => {
//   res.json({ message: `Welcome, ${req.user.email}!`, user: req.user });
//   console.log(`Welcome, ${req.user.email}!`);
// });
// router.get("/", verifyToken, (req, res) => {
//   res.json({ message: `Welcome, ${req.user.email}!`, user: req.user });
//   console.log(`Welcome, ${req.user.email}!`);
// });

export default router;