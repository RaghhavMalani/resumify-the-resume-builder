
import { Router } from 'express';
import { register, login, getUserById, updateUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', async (req, res) => {
  const result = await register(req.body);
  if (result.success) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json(result);
  }
});

router.post('/login', async (req, res) => {
  const result = await login(req.body);
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(401).json(result);
  }
});

// Protected routes
router.get('/me', authMiddleware, async (req, res) => {
  const result = await getUserById(req.userId!);
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json(result);
  }
});

router.put('/me', authMiddleware, async (req, res) => {
  const result = await updateUser(req.userId!, req.body);
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
});

export default router;
