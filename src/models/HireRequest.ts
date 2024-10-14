import mongoose, { Document, Schema } from 'mongoose';

interface IHireRequest extends Document {
  jobId: mongoose.Types.ObjectId; // Reference to the job
  requestedBy: mongoose.Types.ObjectId; // Reference to the user who sent the hire request
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

const HireRequestSchema: Schema = new Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IHireRequest>('HireRequest', HireRequestSchema);
