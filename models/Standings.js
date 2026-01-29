import mongoose from "mongoose";

const standingsSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  gf: { type: Number, default: 0 },
  ga: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
});

export default mongoose.model("Standings", standingsSchema);
