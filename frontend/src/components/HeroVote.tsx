import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllPolls, voteOnPoll } from '../api/pollApi';
import { EXTERNAL_URLS } from '../constants/urls';
import styles from '../styles/components/heroVote.module.css';

interface PollOption {
  id: number;
  option_text: string;
  vote_count: number;
}

interface PollImage {
  id: number;
  image_url: string;
  image_description: string;
  display_order: number;
}

interface Poll {
  id: number;
  title: string;
  category: string;
  description: string;
  options: PollOption[];
  images?: PollImage[];
  main_image_url?: string;
  creator_id: number;
  created_at: string;
}

const HeroVote: React.FC = React.memo(() => {
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

  const handleVote = useCallback(async (pollId: number, optionId: number) => {
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
  }, []);

  const nextTopic = useCallback(() => setCurrent((prev) => (prev + 1) % polls.length), [polls.length]);
  const prevTopic = useCallback(() => setCurrent((prev) => (prev - 1 + polls.length) % polls.length), [polls.length]);

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

  // Get all images for display (up to 4 for good layout)
  const getDisplayImages = (poll: Poll) => {
    if (poll.images && poll.images.length > 0) {
      // Sort by display_order and take up to 4 images
      const sortedImages = [...poll.images].sort((a, b) => a.display_order - b.display_order);
      return sortedImages.slice(0, 4);
    }
    if (poll.main_image_url) {
      return [{ id: 0, image_url: poll.main_image_url, image_description: poll.title, display_order: 1 }];
    }
    return [{ id: 0, image_url: EXTERNAL_URLS.PLACEHOLDER_LANDSCAPE, image_description: 'Poll image', display_order: 1 }];
  };

  return (
    <div className={styles.heroVoteBg}>
      <div className={styles.topicBox}>
        <h1 className={styles.topicStatement}>{currentPoll.title}</h1>
        <div className={styles.imageBox}>
          {(() => {
            const displayImages = getDisplayImages(currentPoll);
            
            if (displayImages.length === 1) {
              // Single image - full width
              return (
                <img 
                  src={displayImages[0].image_url}
                  alt={displayImages[0].image_description || currentPoll.title} 
                  className={styles.topicImage} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = EXTERNAL_URLS.PLACEHOLDER_LANDSCAPE;
                  }}
                />
              );
            } else {
              // Multiple images - grid layout
              return (
                <div className={styles.multipleImages}>
                  {displayImages.map((image, index) => (
                    <div key={image.id || index} className={styles.imageContainer}>
                      <img 
                        src={image.image_url}
                        alt={image.image_description || `Candidate ${index + 1}`} 
                        className={styles.candidateImage} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = EXTERNAL_URLS.PLACEHOLDER_LANDSCAPE;
                        }}
                      />
                      {image.image_description && (
                        <span className={styles.candidateName}>{image.image_description}</span>
                      )}
                    </div>
                  ))}
                </div>
              );
            }
          })()}
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
});

export default HeroVote;
