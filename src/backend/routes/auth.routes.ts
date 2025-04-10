
import express from 'express';
import { 
  loginUser, 
  registerUser, 
  checkAuthStatus,
  refreshToken
} from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', (req, res, next) => {
  try {
    registerUser(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login user and get token
 * @access Public
 */
router.post('/login', (req, res, next) => {
  try {
    loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/auth/status
 * @desc Check if user is authenticated
 * @access Private
 */
router.get('/status', authenticateJWT, (req, res, next) => {
  try {
    checkAuthStatus(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/refresh
 * @desc Refresh access token using refresh token
 * @access Public
 */
router.post('/refresh', (req, res, next) => {
  try {
    refreshToken(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
