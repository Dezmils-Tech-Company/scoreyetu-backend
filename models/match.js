import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  homeSchool: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  awaySchool: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Upcoming", "Ongoing", "Completed"], default: "Upcoming" }
});

export default mongoose.model("Match", matchSchema);
