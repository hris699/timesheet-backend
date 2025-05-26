import express from 'express';
import User from '../models/User.js';
import jwtUtils from '../utils/jwt.js';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController(User, jwtUtils);

// Route for user login
router.post('/login', (req, res) => authController.login(req, res));

// Route for user registration
router.post('/register', (req, res) => authController.register(req, res));

export default router;