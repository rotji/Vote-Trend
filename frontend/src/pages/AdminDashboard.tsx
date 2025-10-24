import React, { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/components/adminDashboard.module.css';

const samplePolls = [
  { id: 1, title: 'Who will win the Champions League?', user: 'Alice', status: 'pending', blockchain: 'unsynced' },
  { id: 2, title: 'Best movie of the year?', user: 'Bob', status: 'approved', blockchain: 'synced' },
  { id: 3, title: 'Do you support the new education policy?', user: 'Carol', status: 'pending', blockchain: 'unsynced' },
];

const AdminDashboard: React.FC = () => {
  const [polls, setPolls] = useState(samplePolls);
  const [walletConnected, setWalletConnected] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'fail'>('idle');

  const handleApprove = (id: number) => {
    setTxStatus('pending');
    setTimeout(() => {
      setPolls((prev) => prev.map((p) => p.id === id ? { ...p, status: 'approved', blockchain: 'synced' } : p));
      setTxStatus('success');
      setTimeout(() => setTxStatus('idle'), 1200);
    }, 1200);
  };
  const handleReject = (id: number) => {
    setPolls((prev) => prev.filter((p) => p.id !== id));
  };
  const handleConnectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <div className={styles.adminBg}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Vote-Trend Admin</h2>
        <nav className={styles.nav}>
          <a className={styles.activeNav}>Polls</a>
          <a>User Submissions</a>
          <a>Blockchain Status</a>
        </nav>
        <div className={styles.walletSection}>
          {walletConnected ? (
            <div className={styles.walletConnected}>Wallet Connected</div>
          ) : (
            <Button variant="secondary" onClick={handleConnectWallet}>Connect Wallet</Button>
          )}
        </div>
      </aside>
      <main className={styles.mainContent}>
        <h3 className={styles.heading}>Poll Management</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Status</th>
              <th>Blockchain</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => (
              <tr key={poll.id}>
                <td>{poll.title}</td>
                <td>{poll.user}</td>
                <td>
                  <span className={poll.status === 'approved' ? styles.approved : styles.pending}>
                    {poll.status}
                  </span>
                </td>
                <td>
                  <span className={poll.blockchain === 'synced' ? styles.synced : styles.unsynced}>
                    {poll.blockchain}
                  </span>
                </td>
                <td>
                  {poll.status === 'pending' && (
                    <>
                      <Button variant="primary" onClick={() => handleApprove(poll.id)}>
                        Approve
                      </Button>
                      <Button variant="secondary" onClick={() => handleReject(poll.id)}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {txStatus === 'pending' && <div className={styles.txStatus}>⏳ Transaction Pending...</div>}
        {txStatus === 'success' && <div className={styles.txStatusSuccess}>✅ Transaction Success!</div>}
        {txStatus === 'fail' && <div className={styles.txStatusFail}>❌ Transaction Failed</div>}
      </main>
    </div>
  );
};

export default AdminDashboard;
