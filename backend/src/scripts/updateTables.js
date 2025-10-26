const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

async function updateTables() {
  try {
    // Add options column to polls table
    await pool.query(`
      ALTER TABLE polls 
      ADD COLUMN IF NOT EXISTS options TEXT[]
    `);
    console.log('Added options column to polls table');

    // Create poll_options table for better structure
    await pool.query(`
      CREATE TABLE IF NOT EXISTS poll_options (
        id SERIAL PRIMARY KEY,
        poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
        option_text VARCHAR(255) NOT NULL,
        vote_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Poll options table created successfully');

    // Update votes table to reference poll_options
    await pool.query(`
      ALTER TABLE votes 
      ADD COLUMN IF NOT EXISTS option_id INTEGER REFERENCES poll_options(id)
    `);
    console.log('Added option_id to votes table');

    console.log('Database schema updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating tables:', error);
    process.exit(1);
  }
}

updateTables();