import React, { useState } from 'react';
import styles from '../styles/components/auth.module.css';
import Button from '../components/Button';
import { buildGoogleIconUrl } from '../constants/urls';

const Auth: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register' | 'wallet'>('login');

  return (
    <div className={styles.authBg}>
      <div className={styles.authContainer}>
        <div className={styles.tabs}>
          <button className={tab === 'login' ? styles.activeTab : styles.tab} onClick={() => setTab('login')}>Login</button>
          <button className={tab === 'register' ? styles.activeTab : styles.tab} onClick={() => setTab('register')}>Register</button>
          <button className={tab === 'wallet' ? styles.activeTab : styles.tab} onClick={() => setTab('wallet')}>Wallet</button>
        </div>
        <div className={styles.formSection}>
          {tab === 'login' && (
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <input type="email" required className={styles.input} />
                <label className={styles.label}>Email</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="password" required className={styles.input} />
                <label className={styles.label}>Password</label>
              </div>
              <Button variant="primary" type="submit">Login</Button>
              <div className={styles.socialRow}>
                <button type="button" className={styles.socialBtn}>
                  <img src={buildGoogleIconUrl('google')} alt="Google" className={styles.socialIcon} />
                  Google
                </button>
              </div>
            </form>
          )}
          {tab === 'register' && (
            <form className={styles.form}>
              <div className={styles.inputGroup}>
                <input type="text" required className={styles.input} />
                <label className={styles.label}>Name</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="email" required className={styles.input} />
                <label className={styles.label}>Email</label>
              </div>
              <div className={styles.inputGroup}>
                <input type="password" required className={styles.input} />
                <label className={styles.label}>Password</label>
              </div>
              <Button variant="primary" type="submit">Register</Button>
              <div className={styles.socialRow}>
                <button type="button" className={styles.socialBtn}>
                  <img src={buildGoogleIconUrl('google')} alt="Google" className={styles.socialIcon} />
                  Google
                </button>
              </div>
            </form>
          )}
          {tab === 'wallet' && (
            <div className={styles.walletSection}>
              <p>Connect your Stacks wallet to continue.</p>
              <Button variant="secondary">Connect Wallet</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
