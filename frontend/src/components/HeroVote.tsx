import React, { useState } from 'react';
import styles from '../styles/components/heroVote.module.css';

const topics = [
  {
    id: 1,
    statement: 'Donald Trump has imposed a 100% tariff on Chinese goods. Are you in support or not?',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    votes: {
      support: 100000,
      against: 23000,
      neutral: 300000,
    },
  },
  {
    id: 2,
    statement: 'Who will be the next best world player?',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    votes: {
      support: 50000,
      against: 12000,
      neutral: 80000,
    },
  },
];

const HeroVote: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const topic = topics[current];

  const nextTopic = () => setCurrent((prev) => (prev + 1) % topics.length);
  const prevTopic = () => setCurrent((prev) => (prev - 1 + topics.length) % topics.length);

  return (
    <div className={styles.heroVoteBg}>
      <div className={styles.topicBox}>
        <h1 className={styles.topicStatement}>{topic.statement}</h1>
        <div className={styles.imageBox}>
          <img src={topic.image} alt="topic" className={styles.topicImage} />
        </div>
        <div className={styles.voteStats}>
          <div className={styles.voteItem}><span className={styles.voteCount}>{topic.votes.support.toLocaleString()}</span> in support</div>
          <div className={styles.voteItem}><span className={styles.voteCount}>{topic.votes.against.toLocaleString()}</span> against</div>
          <div className={styles.voteItem}><span className={styles.voteCount}>{topic.votes.neutral.toLocaleString()}</span> none of my business</div>
        </div>
        <div className={styles.arrowNav}>
          <button className={styles.arrowBtn} onClick={prevTopic}>&lt;</button>
          <button className={styles.arrowBtn} onClick={nextTopic}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default HeroVote;
