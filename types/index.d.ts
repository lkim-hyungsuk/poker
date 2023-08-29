import mongoose, { Document } from "mongoose";

declare global {
  interface IUser extends Document {
    username: string;
    totalWins: number;
    totalLosses: number;
    balance: number;
  }

  interface IGame extends mongoose.Document {
    players: mongoose.Types.ObjectId[]; // References to user IDs
    hands: mongoose.Types.ObjectId[]; // Each game has 1 or more hands until there is only one player
  }

  interface IHand extends mongoose.Document {
    gameId: mongoose.Types.ObjectId; // Reference to game ID
    cards: string[]; // Cards dealt in this hand
    bets: mongoose.Types.ObjectId[]; // References to bet IDs
  }
}
