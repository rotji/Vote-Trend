import React, { useState, useEffect } from 'react';
import { getAllPolls, voteOnPoll } from '../api/pollApi';
import CategoryTabs from '../components/CategoryTabs';
import styles from '../styles/components/pollList.module.css';

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
  creator_name: string;
  status: string;
  created_at: string;
  options: PollOption[];
}

const PollList: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [votingPoll, setVotingPoll] = useState<number | null>(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const data = await getAllPolls();
      setPolls(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: number, optionId: number) => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Please log in to vote');
      return;
    }

    const user = JSON.parse(userStr);
    
    try {
      setVotingPoll(pollId);
      await voteOnPoll(pollId.toString(), {
        user_id: user.id,
        option_id: optionId,
      });
      
      // Refresh polls to get updated vote counts
      await fetchPolls();
      alert('Vote cast successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to vote');
    } finally {
      setVotingPoll(null);
    }
  };

  const filteredPolls = activeCategory === 'All' 
    ? polls 
    : polls.filter(poll => poll.category === activeCategory);

  const getTotalVotes = (options: PollOption[]) => {
    return options.reduce((total, option) => total + option.vote_count, 0);
  };

  const getVotePercentage = (optionVotes: number, totalVotes: number) => {
    return totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  };

  if (loading) return <div className={styles.loading}>Loading polls...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.pollListContainer}>
      <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
      <h2 className={styles.categoryTitle}>{activeCategory} Polls</h2>
      
      {filteredPolls.length === 0 ? (
        <div className={styles.noPollsMessage}>
          <p>No approved polls available for this category.</p>
          <p>Be the first to create one!</p>
        </div>
      ) : (
        <div className={styles.pollGrid}>
          {filteredPolls.map((poll) => {
            const totalVotes = getTotalVotes(poll.options);
            const isVoting = votingPoll === poll.id;
            
            return (
              <div key={poll.id} className={styles.pollCard}>
                <div className={styles.pollHeader}>
                  <h3 className={styles.pollTitle}>{poll.title}</h3>
                  <span className={styles.pollCategory}>{poll.category}</span>
                </div>
                
                <p className={styles.pollDescription}>{poll.description}</p>
                
                <div className={styles.pollMeta}>
                  <span>By {poll.creator_name}</span>
                  <span>{totalVotes} votes</span>
                </div>
                
                <div className={styles.optionsContainer}>
                  {poll.options.map((option) => {
                    const percentage = getVotePercentage(option.vote_count, totalVotes);
                    
                    return (
                      <div key={option.id} className={styles.optionItem}>
                        <button
                          className={styles.optionButton}
                          onClick={() => handleVote(poll.id, option.id)}
                          disabled={isVoting}
                        >
                          <div className={styles.optionContent}>
                            <span className={styles.optionText}>{option.option_text}</span>
                            <span className={styles.optionVotes}>
                              {option.vote_count} ({percentage}%)
                            </span>
                          </div>
                          <div 
                            className={styles.optionProgress}
                            style={{ width: `${percentage}%` }}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                {isVoting && (
                  <div className={styles.votingIndicator}>Casting vote...</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PollList;
