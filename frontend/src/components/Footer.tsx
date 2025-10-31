import React from 'react';
import styles from '../styles/components/footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.businessInfo}>
          <p className={styles.businessMessage}>
            💼 For partnerships, collaboration opportunities, becoming an investor for equity stake, 
            or any other business inquiries, reach out to us:
          </p>
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>📧 Email us at:</span>
            <a href="mailto:starrotji@gmail.com" className={styles.contactLink}>starrotji@gmail.com</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>📱 WhatsApp:</span>
            <a href="https://wa.me/2348082205654" className={styles.contactLink}>+234 08082205654</a>
          </div>
        </div>
        <div className={styles.opportunities}>
          <p className={styles.opportunitiesText}>
            🤝 We welcome strategic partnerships • 💡 Collaboration opportunities • 💰 Investment discussions • 📈 Equity partnerships
          </p>
        </div>
        <span>© {new Date().getFullYear()} Vote-Trend. All rights reserved.</span>
        <nav className={styles.footerNav}>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">Investors</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
