
import express from 'express';
import { 
  getResumes, 
  getResume, 
  createResume,
  updateResume, 
  deleteResume 
} from '../controllers/resume.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all resume routes
router.use(authMiddleware);

// Get all resumes for a user
router.get('/', (req, res) => {
  try {
    getResumes(req, res);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error fetching resumes'
    });
  }
});

// Get a specific resume by ID
router.get('/:id', (req, res) => {
  try {
    getResume(req, res);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error fetching resume'
    });
  }
});

// Create a new resume
router.post('/', (req, res) => {
  try {
    createResume(req, res);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error creating resume'
    });
  }
});

// Update an existing resume
router.put('/:id', (req, res) => {
  try {
    updateResume(req, res);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error updating resume'
    });
  }
});

// Delete a resume
router.delete('/:id', (req, res) => {
  try {
    deleteResume(req, res);
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error deleting resume'
    });
  }
});

export default router;
