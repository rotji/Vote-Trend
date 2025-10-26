
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
  <Link to="/home" className={styles.logo}>Vote-Trend</Link>
      <div className={styles.spacer} />
      <div className={styles.actions}>
        <Link to="/home" className={styles.homeLink}>Home</Link>
        <Link to="/admin" className={styles.adminLink}>Admin</Link>
  <Link to="/login" className={styles.loginBtn}>Login</Link>
  <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
  <button className={styles.walletBtn}>Connect Wallet</button>
      </div>
    </nav>
  );
};

export default Navbar;
