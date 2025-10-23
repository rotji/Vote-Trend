import React from 'react';
import styles from '../styles/components/navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Vote-Trend</div>
      <div className={styles.spacer} />
      <div className={styles.actions}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.walletBtn}>Connect Wallet</button>
      </div>
    </nav>
  );
};

export default Navbar;
