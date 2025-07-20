import express from 'express';
import {  } from '../controllers/userAuthenticateController.js';

const router = express.Router();

router.post('/api/logout', logoutUserHandler);

export default router;