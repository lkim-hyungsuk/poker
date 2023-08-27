import { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    username: string;
    totalWins: number;
    totalLosses: number;
    balance: number;
  }
}
