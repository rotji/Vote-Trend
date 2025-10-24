import { Request, Response } from 'express';
import pool from '../config/db/postgres';

export const getAllPolls = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM polls WHERE status = $1', ['approved']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
};

export const createPoll = async (req: Request, res: Response) => {
  const { title, category, description, creator_id } = req.body;
  if (!title || !category || !description || !creator_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO polls (title, category, description, creator_id, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [title, category, description, creator_id, 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
};

export const getPollById = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM polls WHERE id = $1', [pollId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poll' });
  }
};

export const voteOnPoll = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  const { user_id, option } = req.body;
  if (!user_id || !option) {
    return res.status(400).json({ error: 'Missing user_id or option' });
  }
  try {
    // Check if poll exists and is approved
    const pollResult = await pool.query('SELECT * FROM polls WHERE id = $1 AND status = $2', [pollId, 'approved']);
    if (pollResult.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found or not approved' });
    }
    // Check if user already voted
    const voteResult = await pool.query('SELECT * FROM votes WHERE poll_id = $1 AND user_id = $2', [pollId, user_id]);
    if (voteResult.rows.length > 0) {
      return res.status(400).json({ error: 'User has already voted' });
    }
    // Insert vote
    const insertResult = await pool.query(
      'INSERT INTO votes (poll_id, user_id, option, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [pollId, user_id, option]
    );
    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cast vote' });
  }
};
