import { apiCall } from '../utils/api';

export const registerUser = async (name: string, email: string, password: string) => {
  return await apiCall('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async (email: string, password: string) => {
  return await apiCall('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
