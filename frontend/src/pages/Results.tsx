import React, { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/components/results.module.css';

const poll = {
  title: 'Who will win the Champions League?',
  options: [
    { label: 'Man City', votes: 56, color: '#2563eb' },
    { label: 'Real Madrid', votes: 22, color: '#10b981' },
    { label: 'Bayern', votes: 12, color: '#f59e0b' },
    { label: 'Other', votes: 10, color: '#6c2eb7' },
  ],
};
const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

const Results: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={styles.resultsBg}>
      <div className={styles.resultsContainer}>
        <h2 className={styles.title}>{poll.title}</h2>
        <div className={styles.totalVotes}>Total Votes: {totalVotes}</div>
        <div className={styles.chartSection}>
          {poll.options.map((opt) => (
            <div key={opt.label} className={styles.barRow}>
              <span className={styles.optionLabel}>{opt.label}</span>
              <div className={styles.barBg}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${Math.round((opt.votes / totalVotes) * 100)}%`,
                    background: opt.color,
                  }}
                />
                <span className={styles.percent}>{Math.round((opt.votes / totalVotes) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" onClick={handleShare} className={styles.shareBtn}>
          {copied ? 'Link Copied!' : 'Share this poll'}
        </Button>
      </div>
    </div>
  );
};

export default Results;
