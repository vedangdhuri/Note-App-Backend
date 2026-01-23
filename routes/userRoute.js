import express from 'express';
import { registerUser } from '../controllers/userControllers.js';
import { verification } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verification);

export default router;