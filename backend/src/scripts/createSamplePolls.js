const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function createSamplePolls() {
  try {
    // Create sample polls for testing
    const samplePolls = [
      {
        title: 'Who will win the FIFA World Cup 2026?',
        category: 'Sports',
        description: 'Vote for your prediction of the next World Cup winner.',
        creator_id: 1,
        options: ['Brazil', 'Argentina', 'France', 'England']
      },
      {
        title: 'Best programming language for beginners?',
        category: 'Tech',
        description: 'Which programming language should new developers learn first?',
        creator_id: 1,
        options: ['Python', 'JavaScript', 'Java', 'C++']
      },
      {
        title: 'Should remote work be permanent?',
        category: 'Others',
        description: 'Do you think companies should offer permanent remote work options?',
        creator_id: 1,
        options: ['Yes, fully remote', 'Hybrid model', 'No, office only']
      }
    ];

    for (const poll of samplePolls) {
      // Insert poll with approved status
      const pollResult = await pool.query(
        'INSERT INTO polls (title, category, description, creator_id, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
        [poll.title, poll.category, poll.description, poll.creator_id, 'approved']
      );
      
      const pollId = pollResult.rows[0].id;
      console.log(`Created poll: ${poll.title} (ID: ${pollId})`);
      
      // Insert options
      for (const option of poll.options) {
        await pool.query(
          'INSERT INTO poll_options (poll_id, option_text, vote_count) VALUES ($1, $2, $3)',
          [pollId, option, 0]
        );
      }
      console.log(`Added ${poll.options.length} options to poll ${pollId}`);
    }

    console.log('Sample polls created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample polls:', error);
    process.exit(1);
  }
}

createSamplePolls();