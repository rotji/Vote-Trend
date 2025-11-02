
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/navbar.module.css';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.logo}>Vote-Trend</Link>
      <div className={styles.spacer} />
      <div className={styles.actions}>
        <Link to="/home" className={styles.homeLink}>Home</Link>
        <Link to="/polls" className={styles.pollsLink}>Polls</Link>
        <Link to="/submit-topic" className={styles.submitLink}>
          {isMobile ? 'Create' : 'Create Poll'}
        </Link>
        <Link to="/admin" className={styles.adminLink}>Admin</Link>
        <Link to="/login" className={styles.loginBtn}>Login</Link>
        <Link to="/signup" className={styles.signupBtn}>
          {isMobile ? 'Join' : 'Sign Up'}
        </Link>
        <button className={styles.walletBtn}>
          {isMobile ? 'Wallet' : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
