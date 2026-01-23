// models/School.js
import mongoose from "mongoose";

const schoolSchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }], // many games
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  coaches: [{
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    name: String
  }],
  gallery: [String],
  recentEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  upcomingEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  vulnerabilities: [String],
  challenges: [String]
}, { timestamps: true });

const School = mongoose.model("School", schoolSchema);
export default School;
