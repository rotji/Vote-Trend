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
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
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
