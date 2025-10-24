// Vote model for PostgreSQL (interface only, for query use)
export interface Vote {
  id: number;
  poll_id: number;
  user_id: number;
  option: string;
  created_at: Date;
}
