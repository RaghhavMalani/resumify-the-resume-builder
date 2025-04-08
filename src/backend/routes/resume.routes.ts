
import { Router, Request, Response } from 'express';
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
router.post('/', async (req: Request, res: Response) => {
  try {
    // Make sure userId matches authenticated user
    const resumeData = {
      ...req.body,
      userId: req.userId
    };
    
    const result = await createResume(resumeData);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error while creating resume' 
    });
  }
});

// Get all resumes for the authenticated user
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await getResumesByUser(req.userId!);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error while fetching resumes' 
    });
  }
});

// Get a specific resume by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await getResumeById(req.params.id);
    
    if (!result.success) {
      res.status(404).json(result);
      return;
    }
    
    // Check if resume belongs to authenticated user
    const resumeUserId = result.data?.userId.toString();
    const requestUserId = req.userId?.toString();
    
    if (resumeUserId !== requestUserId) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to access this resume'
      });
      return;
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error while fetching resume' 
    });
  }
});

// Update a resume
router.put('/:id', async (req: Request, res: Response) => {
  try {
    // First get the resume to check ownership
    const checkResult = await getResumeById(req.params.id);
    
    if (!checkResult.success) {
      res.status(404).json(checkResult);
      return;
    }
    
    // Check if resume belongs to authenticated user
    const resumeUserId = checkResult.data?.userId.toString();
    const requestUserId = req.userId?.toString();
    
    if (resumeUserId !== requestUserId) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to modify this resume'
      });
      return;
    }
    
    const result = await updateResume(req.params.id, req.body);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error while updating resume' 
    });
  }
});

// Delete a resume
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // First get the resume to check ownership
    const checkResult = await getResumeById(req.params.id);
    
    if (!checkResult.success) {
      res.status(404).json(checkResult);
      return;
    }
    
    // Check if resume belongs to authenticated user
    const resumeUserId = checkResult.data?.userId.toString();
    const requestUserId = req.userId?.toString();
    
    if (resumeUserId !== requestUserId) {
      res.status(403).json({
        success: false,
        error: 'You do not have permission to delete this resume'
      });
      return;
    }
    
    const result = await deleteResume(req.params.id);
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Server error while deleting resume' 
    });
  }
});

export default router;
