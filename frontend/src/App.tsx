import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ApiTest from './components/ApiTest';
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
  const mainStyle = {
    padding: window.innerWidth <= 768 ? '1rem 0.5rem' : '2rem',
    textAlign: 'center' as const,
    minHeight: '70vh',
    color: '#222',
    background: 'transparent',
    width: '100%',
    boxSizing: 'border-box' as const,
    overflowX: 'hidden' as const
  };

  return (
    <ErrorBoundary>
      <Router>
        <div style={{ width: '100%', overflowX: 'hidden', margin: 0, padding: 0 }}>
          <Navbar />
          <div style={mainStyle}>
            <ErrorBoundary>
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
                <Route path="/api-test" element={<ApiTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
