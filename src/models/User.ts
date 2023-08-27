import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  totalWins: number;
  totalLosses: number;
  balance: number;
}

const userSchema = new Schema<IUser>({
  username: String,
  totalWins: Number,
  totalLosses: Number,
  balance: Number,
});

export const User = mongoose.model<IUser>("User", userSchema);
