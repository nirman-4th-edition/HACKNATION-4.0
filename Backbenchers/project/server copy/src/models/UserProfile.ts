// models/UserProfile.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUserProfile extends Document {
  profileId: string;
  name: string;
  email: string;
  residenceType: "rural" | "urban";
  annualIncome: number; 
  age: number;          
  numberOfDependants: number;
}

const UserProfileSchema = new Schema<IUserProfile>({
  profileId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  residenceType: { type: String, enum: ["rural", "urban"], required: true },
  annualIncome: { type: Number, required: true },  
  age: { type: Number, required: true }, 
  numberOfDependants: { type: Number, required: true },
});

const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
