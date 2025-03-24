
// Server configuration settings
export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/resumify-resume-builder",
  jwtSecret: process.env.JWT_SECRET || 'resumify-secret-key',
  jwtExpiresIn: '24h',
  bcryptSaltRounds: 10,
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:8080'],
};

// Validation constants
export const VALIDATION = {
  password: {
    minLength: 6,
    maxLength: 50
  },
  name: {
    minLength: 2,
    maxLength: 100
  },
  email: {
    maxLength: 255
  }
};
