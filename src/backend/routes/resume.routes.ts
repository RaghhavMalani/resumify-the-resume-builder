
import express from 'express';
import { 
  getResumes, 
  getResume, 
  createResume,
  updateResume, 
  deleteResume 
} from '../controllers/resume.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all resume routes
router.use(authenticate);

// Get all resumes for a user
router.get('/', (req, res, next) => {
  try {
    getResumes(req, res);
  } catch (error) {
    next(error);
  }
});

// Get a specific resume by ID
router.get('/:id', (req, res, next) => {
  try {
    getResume(req, res);
  } catch (error) {
    next(error);
  }
});

// Create a new resume
router.post('/', (req, res, next) => {
  try {
    createResume(req, res);
  } catch (error) {
    next(error);
  }
});

// Update an existing resume
router.put('/:id', (req, res, next) => {
  try {
    updateResume(req, res);
  } catch (error) {
    next(error);
  }
});

// Delete a resume
router.delete('/:id', (req, res, next) => {
  try {
    deleteResume(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
