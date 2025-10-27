import { Request, Response } from 'express';
import pool, { executeQuery } from '../config/db/postgres';

export const getAllPolls = async (req: Request, res: Response) => {
  try {
    const pollsResult = await pool.query(`
      SELECT p.*, u.name as creator_name 
      FROM polls p 
      JOIN users u ON p.creator_id = u.id 
      ORDER BY p.created_at DESC
    `);
    
    const polls = pollsResult.rows;
    
    // Get options for each poll
    for (let poll of polls) {
      const optionsResult = await pool.query(
        'SELECT id, option_text, vote_count FROM poll_options WHERE poll_id = $1 ORDER BY id',
        [poll.id]
      );
      poll.options = optionsResult.rows;
    }
    
    res.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
};

export const createPoll = async (req: Request, res: Response) => {
  const { title, category, description, creator_id, options } = req.body;
  if (!title || !category || !description || !creator_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    
    // Insert poll
    const pollResult = await client.query(
      'INSERT INTO polls (title, category, description, creator_id, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [title, category, description, creator_id, 'approved']
    );
    
    const poll = pollResult.rows[0];
    
    // Insert options if provided
    if (options && Array.isArray(options)) {
      for (const option of options.filter(opt => opt.trim())) {
        await client.query(
          'INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)',
          [poll.id, option.trim()]
        );
      }
    }
    
    await client.query('COMMIT');
    res.status(201).json({ poll, message: 'Poll created successfully and pending approval' });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Poll creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create poll', 
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : '') : 'Database connection issue'
    });
  } finally {
    if (client) {
      client.release();
    }
  }
};

export const getPollById = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  try {
    const pollResult = await pool.query(`
      SELECT p.*, u.name as creator_name 
      FROM polls p 
      JOIN users u ON p.creator_id = u.id 
      WHERE p.id = $1
    `, [pollId]);
    
    if (pollResult.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    
    const poll = pollResult.rows[0];
    
    // Get options for the poll
    const optionsResult = await pool.query(
      'SELECT id, option_text, vote_count FROM poll_options WHERE poll_id = $1 ORDER BY id',
      [poll.id]
    );
    poll.options = optionsResult.rows;
    
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poll' });
  }
};

export const voteOnPoll = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  const { user_id, option_id } = req.body;
  
  console.log(`🗳️  Vote request: Poll ${pollId}, User ${user_id}, Option ${option_id}`);
  
  if (!user_id || !option_id) {
    return res.status(400).json({ error: 'Missing user_id or option_id' });
  }
  
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    
    // Check if poll exists
    const pollResult = await client.query('SELECT * FROM polls WHERE id = $1', [pollId]);
    if (pollResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Poll not found' });
    }
    
    // Check if user already voted
    const voteResult = await client.query('SELECT * FROM votes WHERE poll_id = $1 AND user_id = $2', [pollId, user_id]);
    if (voteResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'User has already voted' });
    }
    
    // Verify option belongs to this poll and get option text
    const optionResult = await client.query('SELECT * FROM poll_options WHERE id = $1 AND poll_id = $2', [option_id, pollId]);
    if (optionResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid option for this poll' });
    }
    
    const optionText = optionResult.rows[0].option_text;
    
    // Insert vote with both option_id and option text
    const insertResult = await client.query(
      'INSERT INTO votes (poll_id, user_id, option_id, option, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [pollId, user_id, option_id, optionText]
    );
    
    // Update vote count
    await client.query(
      'UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = $1',
      [option_id]
    );
    
    await client.query('COMMIT');
    console.log('✅ Vote cast successfully');
    res.status(201).json({ vote: insertResult.rows[0], message: 'Vote cast successfully' });
  } catch (error) {
    console.error('❌ Vote casting error:', error);
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('❌ Rollback error:', rollbackError);
      }
    }
    res.status(500).json({ 
      error: 'Failed to cast vote',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : '') : 'Database connection issue'
    });
  } finally {
    if (client) {
      client.release();
    }
  }
};
