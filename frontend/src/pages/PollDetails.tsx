
import React, { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/components/pollDetails.module.css';

const poll = {
  id: 1,
  title: 'Who will win the Champions League?',
  category: 'Sports',
  creator: 'Admin',
  posted: '2 hours ago',
  options: [
    { id: 1, label: 'Man City', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', votes: 32 },
    { id: 2, label: 'Real Madrid', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', votes: 21 },
    { id: 3, label: 'Bayern', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', votes: 17 },
  ],
};

const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

const PollDetails: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (selected !== null) setVoted(true);
  };

  return (
    <div className={styles.pollDetailsBg}>
      <div className={styles.header}>
        <button className={styles.backBtn}>&lt; Back</button>
        <span className={styles.category}>{poll.category}</span>
        <h2 className={styles.title}>{poll.title}</h2>
        <div className={styles.meta}>
          <span>By {poll.creator}</span>
          <span className={styles.dot}>•</span>
          <span>{poll.posted}</span>
        </div>
      </div>
      <div className={styles.optionsSection}>
        {poll.options.map((opt) => (
          <div
            key={opt.id}
            className={
              styles.optionCard +
              (selected === opt.id ? ' ' + styles.selected : '') +
              (voted ? ' ' + styles.voted : '')
            }
            onClick={() => !voted && setSelected(opt.id)}
          >
            <img src={opt.image} alt={opt.label} className={styles.optionImg} />
            <span className={styles.optionLabel}>{opt.label}</span>
            {voted && (
              <div className={styles.resultBarWrap}>
                <div
                  className={styles.resultBar}
                  style={{ width: `${Math.round((opt.votes / totalVotes) * 100)}%` }}
                />
                <span className={styles.resultPercent}>
                  {Math.round((opt.votes / totalVotes) * 100)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {!voted ? (
        <Button
          variant="primary"
          className={styles.voteBtn}
          onClick={handleVote}
          disabled={selected === null}
        >
          Vote
        </Button>
      ) : (
        <div className={styles.confetti}>🎉 Thank you for voting!</div>
      )}
      <div className={styles.commentsSection}>
        <h3>Comments</h3>
        <div className={styles.commentList}>
          <div className={styles.comment}><span className={styles.avatar}>A</span> Great poll!</div>
          <div className={styles.comment}><span className={styles.avatar}>B</span> I think Real Madrid will win.</div>
        </div>
        <form className={styles.commentForm}>
          <input className={styles.commentInput} placeholder="Add a comment..." />
          <Button variant="secondary" type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default PollDetails;
