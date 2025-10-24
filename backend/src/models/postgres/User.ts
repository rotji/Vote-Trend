// User model for PostgreSQL (interface only, for query use)
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  created_at: Date;
}
