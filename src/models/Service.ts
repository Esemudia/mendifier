import mongoose, { Document, Schema } from 'mongoose';

interface IService extends Document {
  name: string;
  description: string;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.model<IService>('Service', ServiceSchema);
