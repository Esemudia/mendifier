import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  profilePicture: string;
  bio?: string;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
 