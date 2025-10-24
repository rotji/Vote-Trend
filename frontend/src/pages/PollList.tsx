import React, { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import PollCard from '../components/PollCard';

const samplePolls = [
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

const PollList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Sports');

  const filteredPolls = samplePolls.filter(
    (poll) => poll.category === activeCategory
  );

  return (
    <div>
      <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
      <h2>{activeCategory} Polls</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {filteredPolls.length === 0 ? (
          <p>No polls available for this category.</p>
        ) : (
          filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              title={poll.title}
              category={poll.category}
              image={poll.image}
              votes={poll.votes}
              onVote={() => alert('Vote submitted!')}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PollList;
