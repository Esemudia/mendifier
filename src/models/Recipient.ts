import mongoose, { Document, Schema } from 'mongoose';

interface IRecipient extends Document {
  email: string;
  name: string;
  campaigns: mongoose.Types.ObjectId[];
}

const RecipientSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
});

export default mongoose.model<IRecipient>('Recipient', RecipientSchema);
