// Poll model for PostgreSQL (interface only, for query use)
export interface Poll {
  id: number;
  title: string;
  category: string;
  description: string;
  creator_id: number;
  created_at: Date;
  status: 'pending' | 'approved' | 'rejected';
}
