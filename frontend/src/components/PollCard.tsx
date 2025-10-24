import React from 'react';
import Card from './Card';
import Button from './Button';

interface PollCardProps {
  title: string;
  category: string;
  image?: string;
  votes: number;
  onVote: () => void;
}

const PollCard: React.FC<PollCardProps> = ({ title, category, image, votes, onVote }) => {
  return (
    <Card>
      {image && (
        <img src={image} alt={title} style={{ width: '100%', borderRadius: '0.5rem 0.5rem 0 0', maxHeight: 180, objectFit: 'cover' }} />
      )}
      <div style={{ padding: '1rem' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', fontWeight: 600 }}>{category}</span>
        <h3 style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.2rem', fontWeight: 700 }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '0.95rem' }}>{votes} votes</span>
          <Button onClick={onVote}>Vote</Button>
        </div>
      </div>
    </Card>
  );
};

export default PollCard;
