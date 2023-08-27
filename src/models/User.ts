import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  username: String,
  totalWins: Number,
  totalLosses: Number,
  balance: Number,
});

export const User = mongoose.model<IUser>("User", userSchema);
