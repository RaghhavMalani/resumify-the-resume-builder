
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { SERVER_CONFIG } from './config/server.config';
import authRoutes from './routes/auth.routes';
import resumeRoutes from './routes/resume.routes';

// Create Express server
const app = express();

// Middleware
app.use(cors({
  origin: SERVER_CONFIG.corsOrigins,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Resumify API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start the server
if (require.main === module) {
  app.listen(SERVER_CONFIG.port, () => {
    console.log(`Server running on port ${SERVER_CONFIG.port} in ${SERVER_CONFIG.environment} mode`);
  });
}

export default app;
