import { Schema, model, Document } from 'mongoose';

export interface CommentDoc extends Document {
  pollId: string;
  userId: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<CommentDoc>({
  pollId: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<CommentDoc>('Comment', CommentSchema);
