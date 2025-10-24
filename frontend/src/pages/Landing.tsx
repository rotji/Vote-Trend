import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import styles from '../styles/components/landing.module.css';

const trendingPolls = [
  {
    id: 1,
    title: 'Who will win the Champions League?',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    votes: 1200,
  },
  {
    id: 2,
    title: 'Do you support the new education policy?',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    votes: 850,
  },
  {
    id: 3,
    title: 'Best movie of the year?',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    votes: 430,
  },
];

const Landing: React.FC = () => {
  return (
    <div className={styles.landingBg}>
      <section className={styles.heroSection}>
        <h1 className={styles.headline}>Vote on trending stories in real time</h1>
        <p className={styles.subheading}>Shape conversations across sports, politics, entertainment, and more.</p>
        <div className={styles.ctaBtns}>
          <Button variant="primary">Login / Sign Up</Button>
          <Button variant="secondary">Connect Wallet</Button>
        </div>
      </section>
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselTitle}>Trending Polls</h2>
        <div className={styles.carousel}>
          {trendingPolls.map((poll) => (
            <Card key={poll.id} className={styles.pollCard}>
              <img src={poll.image} alt={poll.title} className={styles.pollImage} />
              <div className={styles.pollInfo}>
                <span className={styles.pollCategory}>{poll.category}</span>
                <h3 className={styles.pollTitle}>{poll.title}</h3>
                <span className={styles.pollVotes}>{poll.votes} votes</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
