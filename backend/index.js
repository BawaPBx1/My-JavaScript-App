// const express = require('express');
// const cors = require('cors');
// const UserRoute = require('./routes/User.js');
import express from 'express';
import { ensureJwtSecret } from './middleware/ensureJwtSecret.js';
// import { addUserHandler, getUserHandler } from './routes/User.js';
import UserRoute from './routes/User.js';
import DashboardRoute from './routes/DashboardRoute.js';
import cors from 'cors';
const app = express();
app.use(ensureJwtSecret);
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

// app.post('/api/register', addUserHandler)
// app.post('/api/login', getUserHandler)
app.use('/api', UserRoute);
app.use('/', DashboardRoute);
// app.post('/api/register', UserRoute.addUserHandler)
// app.post('/api/register', (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword, acceptTerms } = req.body;

//   // if (!firstName || !lastName || !email || !password || !confirmPassword || !acceptTerms) {
//   //   return res.status(400).json({ success: false, message: 'All fields are required.' });
//   // }
//   // if (password !== confirmPassword) {
//   //   return res.status(400).json({ success: false, message: 'Passwords do not match.' });
//   // }
//   // console.log('Received registration data:', req.body);
//   // res.status(200).json({ success: true, message: 'User registered successfully!' });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});