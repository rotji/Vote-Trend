import { apiCall } from '../utils/api';

// API functions for poll operations
export const createPoll = async (pollData: {
  title: string;
  category: string;
  description: string;
  creator_id: number;
  options?: string[];
  images?: Array<{ url: string; description?: string }>;
  image_url?: string | null; // Legacy support
}) => {
  return await apiCall('/api/polls', {
    method: 'POST',
    body: JSON.stringify(pollData),
  });
};

export const getAllPolls = async () => {
  return await apiCall('/api/polls');
};

export const getPollById = async (pollId: string) => {
  return await apiCall(`/api/polls/${pollId}`);
};

export const voteOnPoll = async (pollId: string, voteData: {
  user_id: number;
  option_id: number;
}) => {
  return await apiCall(`/api/polls/${pollId}/vote`, {
    method: 'POST',
    body: JSON.stringify(voteData),
  });
};