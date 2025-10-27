import React, { useState, useEffect, useRef } from 'react';
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
  options: PollOption[];
  creator_id: number;
  created_at: string;
}

const PollList: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votingStates, setVotingStates] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPolls(polls);
    } else {
      setFilteredPolls(polls.filter(poll => poll.category === activeCategory));
    }
  }, [polls, activeCategory]);

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
    const voteKey = `${pollId}-${optionId}`;
    
    setVotingStates(prev => ({ ...prev, [voteKey]: true }));
    
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
      setVotingStates(prev => ({ ...prev, [voteKey]: false }));
    }
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((total, option) => total + option.vote_count, 0);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
    setCurrentIndex(Math.min(filteredPolls.length - 1, currentIndex + 1));
  };

  if (loading) return <div className={styles.loading}>Loading polls...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.pollListContainer}>
      <h1 className={styles.pageTitle}>Live Polls & Voting</h1>
      
      <CategoryTabs 
        activeCategory={activeCategory} 
        onSelect={setActiveCategory} 
      />

      {filteredPolls.length === 0 ? (
        <div className={styles.noPolls}>
          {activeCategory === 'All' 
            ? 'No polls available. Create the first one!' 
            : `No polls found in ${activeCategory} category.`}
        </div>
      ) : (
        <div className={styles.pollsContainer}>
          <button 
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          >
            ←
          </button>
          
          <div 
            className={styles.pollsGrid}
            ref={scrollContainerRef}
          >
            {filteredPolls.map((poll) => {
              const totalVotes = getTotalVotes(poll);
              return (
                <div key={poll.id} className={styles.pollCard}>
                  {/* Poll Statement/Title at Top - Like Home Page */}
                  <h2 className={styles.pollStatement}>{poll.title}</h2>
                  
                  {/* Image Container - Like Home Page */}
                  <div className={styles.pollImageContainer}>
                    <img 
                      src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80`}
                      alt={poll.title}
                      className={styles.pollImage}
                    />
                  </div>

                  {/* Vote Options with Counts - Like Home Page */}
                  <div className={styles.voteStats}>
                    {poll.options.map((option) => {
                      const voteKey = `${poll.id}-${option.id}`;
                      const isVoting = votingStates[voteKey];
                      
                      return (
                        <div key={option.id} className={styles.voteItem}>
                          <button
                            className={styles.voteButton}
                            onClick={() => handleVote(poll.id, option.id)}
                            disabled={isVoting}
                          >
                            <span className={styles.voteCount}>
                              {option.vote_count.toLocaleString()}
                            </span>
                            <span className={styles.voteLabel}>
                              {option.option_text}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Poll Footer */}
                  <div className={styles.pollFooter}>
                    <span className={styles.category}>{poll.category}</span>
                    <span className={styles.totalVotes}>
                      {totalVotes.toLocaleString()} total votes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            onClick={scrollRight}
            disabled={currentIndex >= filteredPolls.length - 1}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default PollList;