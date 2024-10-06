import mongoose, { Document, Schema } from 'mongoose';

interface ICampaign extends Document {
  subject: string;
  message: string;
  sent: boolean;
  createdAt: Date;
}

const CampaignSchema: Schema = new Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);
