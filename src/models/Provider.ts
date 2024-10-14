import mongoose, { Document, Schema } from 'mongoose';

interface IProvider extends Document {
  name: string;
  services: mongoose.Types.ObjectId[]; // Array of service IDs the provider offers
  location: string;
  contactInfo: string;
}

const ProviderSchema: Schema = new Schema({
  name: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);
