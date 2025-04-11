
import express from 'express';
import { 
  login, 
  register
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', (req, res) => {
  try {
    register(req, res);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login user and get token
 * @access Public
 */
router.post('/login', (req, res) => {
  try {
    login(req, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during login' 
    });
  }
});

/**
 * @route GET /api/auth/status
 * @desc Check if user is authenticated
 * @access Private
 */
router.get('/status', authMiddleware, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: { isAuthenticated: true, userId: req.userId }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error checking authentication status'
    });
  }
});

export default router;
