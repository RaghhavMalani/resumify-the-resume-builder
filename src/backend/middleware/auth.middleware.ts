
import { NextFunction, Request, Response } from 'express';
import { isValidToken, getUserIdFromToken } from '../utils/auth.utils';

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Middleware to verify authentication token
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Authentication token is required' 
    });
  }
  
  if (!isValidToken(token)) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    });
  }
  
  // Extract user ID from token and attach to request
  const userId = getUserIdFromToken(token);
  if (!userId) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid token payload' 
    });
  }
  
  req.userId = userId;
  next();
}

// For backward compatibility, alias authMiddleware as authenticate
export const authenticate = authMiddleware;
