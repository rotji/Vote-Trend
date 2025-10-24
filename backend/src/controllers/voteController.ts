import { Request, Response } from 'express';
import pool from '../config/db/postgres';

export const castVote = async (req: Request, res: Response) => {
  const { poll_id, user_id, option } = req.body;
  if (!poll_id || !user_id || !option) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Check if poll exists and is approved
    const pollResult = await pool.query('SELECT * FROM polls WHERE id = $1 AND status = $2', [poll_id, 'approved']);
    if (pollResult.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found or not approved' });
    }
    // Check if user already voted
    const voteResult = await pool.query('SELECT * FROM votes WHERE poll_id = $1 AND user_id = $2', [poll_id, user_id]);
    if (voteResult.rows.length > 0) {
      return res.status(400).json({ error: 'User has already voted' });
    }
    // Insert vote
    const insertResult = await pool.query(
      'INSERT INTO votes (poll_id, user_id, option, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [poll_id, user_id, option]
    );
    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cast vote' });
  }
};

export const getVotesByPoll = async (req: Request, res: Response) => {
  const pollId = req.params.pollId;
  try {
    const result = await pool.query('SELECT * FROM votes WHERE poll_id = $1', [pollId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
};
