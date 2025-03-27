
import { Router } from 'express';
import { 
  createResume, 
  updateResume, 
  getResumeById, 
  getResumesByUser, 
  deleteResume 
} from '../controllers/resume.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// All resume routes are protected
router.use(authMiddleware);

// Create a new resume
router.post('/', async (req, res) => {
  // Make sure userId matches authenticated user
  const resumeData = {
    ...req.body,
    userId: req.userId
  };
  
  const result = await createResume(resumeData);
  if (result.success) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json(result);
  }
});

// Get all resumes for the authenticated user
router.get('/', async (req, res) => {
  const result = await getResumesByUser(req.userId!);
  return res.status(result.success ? 200 : 400).json(result);
});

// Get a specific resume by ID
router.get('/:id', async (req, res) => {
  const result = await getResumeById(req.params.id);
  
  if (!result.success) {
    return res.status(404).json(result);
  }
  
  // Check if resume belongs to authenticated user
  if (result.data?.userId.toString() !== req.userId) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to access this resume'
    });
  }
  
  return res.status(200).json(result);
});

// Update a resume
router.put('/:id', async (req, res) => {
  // First get the resume to check ownership
  const checkResult = await getResumeById(req.params.id);
  
  if (!checkResult.success) {
    return res.status(404).json(checkResult);
  }
  
  // Check if resume belongs to authenticated user
  if (checkResult.data?.userId.toString() !== req.userId) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to modify this resume'
    });
  }
  
  const result = await updateResume(req.params.id, req.body);
  return res.status(result.success ? 200 : 400).json(result);
});

// Delete a resume
router.delete('/:id', async (req, res) => {
  // First get the resume to check ownership
  const checkResult = await getResumeById(req.params.id);
  
  if (!checkResult.success) {
    return res.status(404).json(checkResult);
  }
  
  // Check if resume belongs to authenticated user
  if (checkResult.data?.userId.toString() !== req.userId) {
    return res.status(403).json({
      success: false,
      error: 'You do not have permission to delete this resume'
    });
  }
  
  const result = await deleteResume(req.params.id);
  return res.status(result.success ? 200 : 400).json(result);
});

export default router;
