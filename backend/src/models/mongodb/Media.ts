import { Schema, model, Document } from 'mongoose';

export interface MediaDoc extends Document {
  url: string;
  type: string;
  uploadedBy: string;
  createdAt: Date;
}

const MediaSchema = new Schema<MediaDoc>({
  url: { type: String, required: true },
  type: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<MediaDoc>('Media', MediaSchema);
