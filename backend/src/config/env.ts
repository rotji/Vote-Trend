import dotenv from 'dotenv';
dotenv.config();

export const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_SSL,
  MONGODB_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  FRONTEND_URL,
  MAX_REQUESTS_PER_HOUR,
  BCRYPT_ROUNDS,
} = process.env;

// Provide default values for optional configurations
export const config = {
  postgres: {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT || '5432'),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    ssl: POSTGRES_SSL === 'true' || NODE_ENV === 'production',
  },
  mongodb: {
    uri: MONGODB_URI,
  },
  cloudinary: {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  },
  server: {
    port: parseInt(PORT || '4000'),
    env: NODE_ENV || 'development',
    frontendUrl: FRONTEND_URL || 'http://localhost:5173',
  },
  security: {
    jwtSecret: JWT_SECRET || 'fallback-secret-change-in-production',
    maxRequestsPerHour: parseInt(MAX_REQUESTS_PER_HOUR || '1000'),
    bcryptRounds: parseInt(BCRYPT_ROUNDS || '12'),
  },
};
