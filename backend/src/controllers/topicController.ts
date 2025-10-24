import { Request, Response } from 'express';
import Topic from '../models/mongodb/Topic';

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({ status: 'approved' });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

export const createTopic = async (req: Request, res: Response) => {
  const { title, category, description, imageUrl, options, createdBy } = req.body;
  if (!title || !category || !description || !options || !createdBy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const topic = new Topic({
      title,
      category,
      description,
      imageUrl,
      options,
      createdBy,
      status: 'pending',
    });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create topic' });
  }
};

export const getTopicById = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  try {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topic' });
  }
};
