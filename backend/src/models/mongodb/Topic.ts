import { Schema, model, Document } from 'mongoose';

export interface TopicDoc extends Document {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  options: string[];
  createdBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const TopicSchema = new Schema<TopicDoc>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  options: [{ type: String, required: true }],
  createdBy: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default model<TopicDoc>('Topic', TopicSchema);
