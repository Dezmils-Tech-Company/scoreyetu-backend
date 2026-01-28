// models/Standings.js
import mongoose from "mongoose";

const standingsSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  gf: { type: Number, default: 0 },
  ga: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

export default mongoose.model("Standings", standingsSchema);
