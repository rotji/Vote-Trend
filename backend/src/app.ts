import express from 'express';
import cors from 'cors';
import pollRoutes from './routes/pollRoutes';
import userRoutes from './routes/userRoutes';
import voteRoutes from './routes/voteRoutes';
import topicRoutes from './routes/topicRoutes';
import adminRoutes from './routes/adminRoutes';
import imageRoutes from './routes/imageRoutes';
import pool from './config/db/postgres';
import { connectMongo } from './config/db/mongodb';
import { 
  globalErrorHandler, 
  handleUnhandledRejections, 
  handleUncaughtExceptions 
} from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// Set up global error handlers
handleUnhandledRejections();
handleUncaughtExceptions();

// Initialize DB connections
connectMongo();
pool.connect().then(() => console.log('PostgreSQL connected')).catch(console.error);

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Development - Vite
  'http://localhost:3000', // Development - Alternative
  'http://localhost:4173', // Development - Vite preview
  'https://localhost:5173', // Development - HTTPS
  process.env.FRONTEND_URL, // Production - Set in environment
  'https://vote-trend-frontend.netlify.app', // Production - Default Netlify pattern
  /https:\/\/.*\.netlify\.app$/, // Any Netlify app
  /https:\/\/.*--.*\.netlify\.app$/, // Netlify branch deploys
].filter(Boolean);

console.log('🔒 CORS Configuration:', {
  allowedOrigins: allowedOrigins.map(origin => 
    origin ? (typeof origin === 'string' ? origin : origin.toString()) : 'undefined'
  ),
  frontendUrl: process.env.FRONTEND_URL,
  nodeEnv: process.env.NODE_ENV
});

app.use(cors({
  origin: function (origin, callback) {
    console.log('🌐 CORS Request from:', origin);
    
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      console.log('✅ CORS: Allowing request with no origin');
      return callback(null, true);
    }
    
    // Check against allowed origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      console.log('✅ CORS: Origin allowed');
      callback(null, true);
    } else {
      console.log('❌ CORS: Origin not allowed');
      // In development, be more permissive
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Development mode: Allowing origin');
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));
app.use(express.json());

// API Routes
app.use('/api/polls', pollRoutes);
app.use('/api/users', userRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.send('Vote-Trend backend is running!');
});

// Health check endpoint with CORS info
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    corsOrigins: allowedOrigins.map(origin => 
      origin ? (typeof origin === 'string' ? origin : origin.toString()) : 'undefined'
    ),
    frontendUrl: process.env.FRONTEND_URL
  });
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
