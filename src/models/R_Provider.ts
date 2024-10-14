import mongoose, { Document, Schema } from 'mongoose';

interface IRProvider extends Document {
  name: string;
  services: mongoose.Types.ObjectId[];
  location: string;
  contactInfo: string;
  ratings: number[]; 
  averageRating: number;
}

const RProviderSchema: Schema = new Schema({
  name: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
  ratings: { type: [Number], default: [] }, 
  averageRating: { type: Number, default: 0 }, 
});

RProviderSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, curr) => acc + curr, 0);
  this.averageRating = sum / this.ratings.length;
};

RProviderSchema.pre('save', function (next) {
  this.calculateAverageRating();
  next();
});

export default mongoose.model<IRProvider>('Provider', RProviderSchema);
