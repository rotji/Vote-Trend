import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PollList from './pages/PollList';
import PollDetails from './pages/PollDetails';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import SubmitTopic from './pages/SubmitTopic';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem', textAlign: 'center', minHeight: '70vh', color: '#222', background: 'transparent' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/polls" element={<PollList />} />
          <Route path="/polls/:id" element={<PollDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/submit-topic" element={<SubmitTopic />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
