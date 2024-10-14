import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
  user: mongoose.Types.ObjectId; // Reference to the User model
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
