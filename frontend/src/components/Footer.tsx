import React from 'react';
import styles from '../styles/components/footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>© {new Date().getFullYear()} Vote-Trend. All rights reserved.</span>
        <nav className={styles.footerNav}>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
