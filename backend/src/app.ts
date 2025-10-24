import express from 'express';
import pollRoutes from './routes/pollRoutes';
import userRoutes from './routes/userRoutes';
import voteRoutes from './routes/voteRoutes';
import topicRoutes from './routes/topicRoutes';
import adminRoutes from './routes/adminRoutes';
import pool from './config/db/postgres';
import { connectMongo } from './config/db/mongodb';

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize DB connections
connectMongo();
pool.connect().then(() => console.log('PostgreSQL connected')).catch(console.error);

app.use(express.json());

// API Routes
app.use('/api/polls', pollRoutes);
app.use('/api/users', userRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Vote-Trend backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
