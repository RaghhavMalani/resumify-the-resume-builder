
import express from 'express';
import { 
  login, 
  register, 
  checkAuth,
  refresh
} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', (req, res, next) => {
  try {
    register(req, res);
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
    login(req, res);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/auth/status
 * @desc Check if user is authenticated
 * @access Private
 */
router.get('/status', authenticate, (req, res, next) => {
  try {
    checkAuth(req, res);
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
    refresh(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
