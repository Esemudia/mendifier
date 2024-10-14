import mongoose, { Document, Schema } from 'mongoose';

interface IJob extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId; // Reference to the user who posted the job
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJob>('Job', JobSchema);
