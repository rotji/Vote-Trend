
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/auth.module.css';
import { registerUser } from '../api/userApi';

const SignUp: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.authBg}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div className={styles.switchAuth}>
          Already have an account?{' '}
          <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
