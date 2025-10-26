import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// In-memory storage for development (temporary)
let users: any[] = [
  { id: 1, name: 'Test User', email: 'test@example.com', password: 'hashed_password', role: 'user' }
];
let polls: any[] = [];
let pollOptions: any[] = [];
let votes: any[] = [];

// User routes
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));
});

app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: 'hashed_' + password, // Mock hashing
    role: 'user',
    created_at: new Date()
  };
  
  users.push(newUser);
  res.status(201).json({ 
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    message: 'User registered successfully' 
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  const user = users.find(u => u.email === email);
  if (!user || user.password !== 'hashed_' + password) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

// Poll routes
app.get('/api/polls', (req, res) => {
  const approvedPolls = polls.filter(p => p.status === 'approved').map(poll => {
    const options = pollOptions.filter(opt => opt.poll_id === poll.id).map(opt => ({
      ...opt,
      vote_count: votes.filter(v => v.option_id === opt.id).length
    }));
    return { ...poll, options };
  });
  res.json(approvedPolls);
});

app.post('/api/polls', (req, res) => {
  const { title, category, description, creator_id, options } = req.body;
  if (!title || !category || !description || !creator_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newPoll = {
    id: polls.length + 1,
    title,
    category,
    description,
    creator_id,
    status: 'approved', // Auto-approve for testing
    created_at: new Date()
  };
  
  polls.push(newPoll);
  
  // Add options
  if (options && Array.isArray(options)) {
    options.filter(opt => opt.trim()).forEach(optionText => {
      pollOptions.push({
        id: pollOptions.length + 1,
        poll_id: newPoll.id,
        option_text: optionText.trim(),
        vote_count: 0
      });
    });
  }
  
  res.status(201).json({ poll: newPoll, message: 'Poll created successfully' });
});

app.post('/api/polls/:id/vote', (req, res) => {
  const pollId = parseInt(req.params.id);
  const { user_id, option_id } = req.body;
  
  if (!user_id || !option_id) {
    return res.status(400).json({ error: 'Missing user_id or option_id' });
  }
  
  // Check if user already voted
  if (votes.find(v => v.poll_id === pollId && v.user_id === user_id)) {
    return res.status(400).json({ error: 'User has already voted' });
  }
  
  const newVote = {
    id: votes.length + 1,
    poll_id: pollId,
    user_id,
    option_id,
    created_at: new Date()
  };
  
  votes.push(newVote);
  res.status(201).json(newVote);
});

app.get('/', (req, res) => {
  res.send('Vote-Trend backend is running! (In-memory mode)');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (In-memory mode)`);
  console.log('Database connections disabled - using in-memory storage');
});