import { Request, Response } from 'express';
import pool from '../config/db/postgres';

export const getPendingPolls = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM polls WHERE status = $1', ['pending']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending polls' });
  }
};

export const approvePoll = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  try {
    const result = await pool.query('UPDATE polls SET status = $1 WHERE id = $2 RETURNING *', ['approved', pollId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve poll' });
  }
};

export const rejectPoll = async (req: Request, res: Response) => {
  const pollId = req.params.id;
  try {
    const result = await pool.query('UPDATE polls SET status = $1 WHERE id = $2 RETURNING *', ['rejected', pollId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject poll' });
  }
};
