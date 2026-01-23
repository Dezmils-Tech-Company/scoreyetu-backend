// models/Game.js
import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
  name: { type: String, required: true }, // e.g. Football, Basketball
  description: { type: String },
}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);
export default Game;
