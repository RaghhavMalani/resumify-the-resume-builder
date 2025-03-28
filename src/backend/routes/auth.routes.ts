
import { Router } from 'express';
import { register, login, getUserById, updateUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', async (req, res) => {
  try {
    const result = await register(req.body);
    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await login(req.body);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error during login' 
    });
  }
});

// Protected routes
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await getUserById(req.userId!);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error while fetching user' 
    });
  }
});

router.put('/me', authMiddleware, async (req, res) => {
  try {
    const result = await updateUser(req.userId!, req.body);
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Server error while updating user' 
    });
  }
});

export default router;
