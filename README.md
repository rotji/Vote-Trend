# Vote-Trend 🗳️

A modern, real-time voting platform where users can create polls, vote on trending topics, and see live results across various categories including sports, politics, entertainment, and technology.

## 🚀 Features

### 🔐 Authentication System
- **User Registration** with secure password hashing (bcrypt)
- **Login/Logout** functionality with session management
- **Form validation** with error/success messages
- **Navigation** between login and signup forms

### 📊 Voting Platform
- **Create Polls** on various topics with multiple options
- **Vote on Polls** with real-time result updates
- **Category-based** organization (Sports, Politics, Entertainment, etc.)
- **Admin Dashboard** for poll moderation and approval

### 🎨 Modern UI/UX
- **Responsive design** with CSS modules
- **Animated forms** and interactive components
- **Hero voting section** with trending topics
- **Clean navigation** with modern styling

### 🛠️ Technical Features
- **Full-stack TypeScript** implementation
- **RESTful API** with proper error handling
- **Database integration** (PostgreSQL + MongoDB)
- **Real-time updates** capability
- **Image upload** support for topics

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **CSS Modules** for styling
- **Fetch API** for backend communication

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Databases
- **PostgreSQL** (Supabase) - Users, polls, votes
- **MongoDB Atlas** - Topics, media, comments
- **Planned**: Cloudinary for image storage

### Future Integrations
- **Stacks Blockchain** for decentralized voting
- **Smart Contracts** (Clarity language)
- **Oracle Services** for blockchain bridge

## 📁 Project Structure

```
Vote-Trend/
├── frontend/                    # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── api/               # API integration layer
│   │   ├── styles/            # CSS modules
│   │   └── assets/            # Static assets
│   ├── public/
│   │   └── docs/              # Project documentation
│   ├── vite.config.ts         # Vite configuration
│   └── package.json
│
├── backend/                     # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── models/            # Database models
│   │   ├── config/            # Database & app configuration
│   │   └── scripts/           # Utility scripts
│   ├── .env                   # Environment variables
│   └── package.json
│
├── smart-contracts/             # Stacks blockchain contracts
├── oracle/                      # Blockchain bridge service
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Supabase account)
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rotji/Vote-Trend.git
   cd Vote-Trend
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   Create `.env` file in backend directory:
   ```env
   # PostgreSQL (Supabase)
   POSTGRES_HOST=your-supabase-host.pooler.supabase.com
   POSTGRES_PORT=5432
   POSTGRES_DB=postgres
   POSTGRES_USER=your-username
   POSTGRES_PASSWORD=your-password

   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vote_trend

   # Application
   PORT=4000
   NODE_ENV=development
   JWT_SECRET=your-jwt-secret

   # Cloudinary (Optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Create Database Tables**
   ```bash
   node src/scripts/createTables.js
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

6. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (development)
- `GET /api/users/:id` - Get user by ID

### Poll Endpoints
- `GET /api/polls` - Get all approved polls
- `POST /api/polls` - Create new poll
- `GET /api/polls/:id` - Get poll by ID
- `POST /api/polls/:id/vote` - Vote on a poll

### Vote Endpoints
- `POST /api/votes` - Cast a vote
- `GET /api/votes/poll/:pollId` - Get votes for a poll

### Topic Endpoints (MongoDB)
- `GET /api/topics` - Get all approved topics
- `POST /api/topics` - Create new topic
- `GET /api/topics/:id` - Get topic by ID

### Admin Endpoints
- `GET /api/admin/polls/pending` - Get pending polls
- `POST /api/admin/polls/:id/approve` - Approve poll
- `POST /api/admin/polls/:id/reject` - Reject poll

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
```

## 🛡️ Security Features

- **Password Hashing** with bcrypt
- **Input Validation** and sanitization
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for sensitive data
- **SQL Injection Prevention** with parameterized queries

## 🚦 Current Status

### ✅ Completed Features
- [x] User registration and authentication
- [x] Login/logout functionality
- [x] Database setup (PostgreSQL + MongoDB)
- [x] Basic poll creation and voting
- [x] Admin dashboard foundation
- [x] Responsive UI components
- [x] API integration layer

### 🚧 In Progress
- [ ] Real-time voting updates
- [ ] Image upload integration (Cloudinary)
- [ ] Advanced poll analytics
- [ ] User profile management

### 📋 Planned Features
- [ ] Blockchain integration (Stacks)
- [ ] Smart contract deployment
- [ ] Wallet connection (Stacks wallet)
- [ ] Decentralized voting verification
- [ ] Mobile app development
- [ ] Social sharing features

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Rotji** - [@rotji](https://github.com/rotji)

Project Link: [https://github.com/rotji/Vote-Trend](https://github.com/rotji/Vote-Trend)

## 🙏 Acknowledgments

- Supabase for PostgreSQL hosting
- MongoDB Atlas for document database
- Vite for lightning-fast development
- React community for excellent documentation
- Stacks ecosystem for blockchain capabilities

---

**Made with ❤️ for democratic participation in the digital age**