import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { getAllPolls } from '../api/pollApi';
import styles from '../styles/components/landing.module.css';

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

const Landing: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const data = await getAllPolls();
      // Get first 3 polls for trending section
      setPolls(data.slice(0, 3));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching polls:', err);
      setLoading(false);
    }
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((total, option) => total + option.vote_count, 0);
  };

  return (
    <div className={styles.landingBg}>
      <section className={styles.heroSection}>
        <h1 className={styles.headline}>Vote on trending stories in real time</h1>
        <p className={styles.subheading}>Shape conversations across sports, politics, entertainment, and more.</p>
        <div className={styles.ctaBtns}>
          <Link to="/polls" className={styles.primaryBtn}>View All Polls</Link>
          <Link to="/submit-topic" className={styles.secondaryBtn}>Create New Poll</Link>
        </div>
      </section>
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselTitle}>Trending Polls</h2>
        {loading ? (
          <div className={styles.loading}>Loading trending polls...</div>
        ) : polls.length === 0 ? (
          <div className={styles.noPollsMessage}>
            <p>No polls available yet.</p>
            <Link to="/submit-topic" className={styles.createFirstPoll}>Create the first poll!</Link>
          </div>
        ) : (
          <div className={styles.carousel}>
            {polls.map((poll) => (
              <Card key={poll.id} className={styles.pollCard}>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                  alt={poll.title} 
                  className={styles.pollImage} 
                />
                <div className={styles.pollInfo}>
                  <span className={styles.pollCategory}>{poll.category}</span>
                  <h3 className={styles.pollTitle}>{poll.title}</h3>
                  <span className={styles.pollVotes}>{getTotalVotes(poll)} votes</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Landing;
