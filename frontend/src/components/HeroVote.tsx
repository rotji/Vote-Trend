import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPolls, voteOnPoll } from '../api/pollApi';
import styles from '../styles/components/heroVote.module.css';

interface PollOption {
  id: number;
  option_text: string;
  vote_count: number;
}

interface Poll {
  id: number;
  title: string;
  category: string;
  description: string;
  options: PollOption[];
  creator_id: number;
  created_at: string;
}

const HeroVote: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votingStates, setVotingStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const data = await getAllPolls();
      setPolls(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleVote = async (pollId: number, optionId: number) => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setError('Please log in to vote');
      return;
    }

    const user = JSON.parse(userStr);
    setVotingStates(prev => ({ ...prev, [optionId]: true }));
    
    try {
      await voteOnPoll(pollId.toString(), {
        user_id: user.id,
        option_id: optionId,
      });
      
      // Refresh polls to get updated vote counts
      await fetchPolls();
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setVotingStates(prev => ({ ...prev, [optionId]: false }));
    }
  };

  const nextTopic = () => setCurrent((prev) => (prev + 1) % polls.length);
  const prevTopic = () => setCurrent((prev) => (prev - 1 + polls.length) % polls.length);

  if (loading) {
    return (
      <div className={styles.heroVoteBg}>
        <div className={styles.topicBox}>
          <h1 className={styles.topicStatement}>Loading trending polls...</h1>
        </div>
      </div>
    );
  }

  if (error || polls.length === 0) {
    return (
      <div className={styles.heroVoteBg}>
        <div className={styles.topicBox}>
          <h1 className={styles.topicStatement}>
            {polls.length === 0 ? 'No polls available yet. Create the first one!' : 'Error loading polls'}
          </h1>
          <div className={styles.actionButtons}>
            <Link to="/polls" className={styles.viewPollsBtn}>View All Polls</Link>
            <Link to="/submit-topic" className={styles.createPollBtn}>Create New Poll</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentPoll = polls[current];
  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((total, option) => total + option.vote_count, 0);
  };

  return (
    <div className={styles.heroVoteBg}>
      <div className={styles.topicBox}>
        <h1 className={styles.topicStatement}>{currentPoll.title}</h1>
        {currentPoll.description && (
          <p className={styles.topicDescription}>{currentPoll.description}</p>
        )}
        <div className={styles.imageBox}>
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="poll topic" 
            className={styles.topicImage} 
          />
        </div>
        <div className={styles.voteStats}>
          {currentPoll.options.map((option) => (
            <div key={option.id} className={styles.voteItem}>
              <button
                className={styles.voteButton}
                onClick={() => handleVote(currentPoll.id, option.id)}
                disabled={votingStates[option.id]}
              >
                <span className={styles.voteCount}>{option.vote_count.toLocaleString()}</span> {option.option_text}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.pollMeta}>
          <span className={styles.category}>{currentPoll.category}</span>
          <span className={styles.totalVotes}>{getTotalVotes(currentPoll).toLocaleString()} total votes</span>
        </div>
        <div className={styles.arrowNav}>
          <button className={styles.arrowBtn} onClick={prevTopic} disabled={polls.length <= 1}>
            &lt;
          </button>
          <span className={styles.pollCounter}>
            {current + 1} of {polls.length}
          </span>
          <button className={styles.arrowBtn} onClick={nextTopic} disabled={polls.length <= 1}>
            &gt;
          </button>
        </div>
        <div className={styles.actionButtons}>
          <Link to="/polls" className={styles.viewPollsBtn}>View All Polls</Link>
          <Link to="/submit-topic" className={styles.createPollBtn}>Create New Poll</Link>
        </div>
      </div>
    </div>
  );
};

export default HeroVote;
