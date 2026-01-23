// models/Player.js
import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  // Basic info
  name: { type: String, required: true },
  photo: { type: String }, // profile picture

  // Sports info
   // e.g. Football, Basketball
  position: { type: String }, // e.g. Striker, Point Guard

  // Relationships
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true }, 
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }], // can play multiple games

  // Achievements
  achievements: [String], // e.g. ["Top scorer 2024", "MVP 2025"]

  // Optional stats
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    goalsScored: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
  },

}, { timestamps: true });

const Player = mongoose.model("Player", playerSchema);
export default Player;
