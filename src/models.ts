import mongoose from "mongoose";

export interface IGame extends mongoose.Document {
  players: mongoose.Types.ObjectId[]; // References to user IDs
  hands: mongoose.Types.ObjectId[]; // References to hand IDs
}

export interface IHand extends mongoose.Document {
  gameId: mongoose.Types.ObjectId; // Reference to game ID
  cards: string[]; // Cards dealt in this hand
  bets: mongoose.Types.ObjectId[]; // References to bet IDs
}
