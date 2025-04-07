
import express from 'express';
import { SERVER_CONFIG } from './config/server.config';
import { clientPromise } from './db/connection';
import app from './server';

// Connect to MongoDB and start server
async function startServer() {
  try {
    // Initialize MongoDB connection
    const client = await clientPromise;
    console.log('Connected to MongoDB successfully');
    
    // Start Express server
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server running on port ${SERVER_CONFIG.port} in ${SERVER_CONFIG.environment} mode`);
      console.log(`API is available at http://localhost:${SERVER_CONFIG.port}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
