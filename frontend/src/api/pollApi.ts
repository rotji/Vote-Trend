// API functions for poll operations
export const createPoll = async (pollData: {
  title: string;
  category: string;
  description: string;
  creator_id: number;
  options?: string[];
}) => {
  const res = await fetch('/api/polls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pollData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create poll');
  }
  return await res.json();
};

export const getAllPolls = async () => {
  const res = await fetch('/api/polls');
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch polls');
  }
  return await res.json();
};

export const getPollById = async (pollId: string) => {
  const res = await fetch(`/api/polls/${pollId}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to fetch poll');
  }
  return await res.json();
};

export const voteOnPoll = async (pollId: string, voteData: {
  user_id: number;
  option_id: number;
}) => {
  const res = await fetch(`/api/polls/${pollId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to vote');
  }
  return await res.json();
};