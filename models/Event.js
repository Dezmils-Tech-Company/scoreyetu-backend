// models/Event.js
import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  sport: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Upcoming", "Ongoing", "Completed"], default: "Upcoming" },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  results: [{
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    wins: Number,
    draws: Number,
    losses: Number,
    points: Number,
    gf: Number, // goals for
    ga: Number, // goals against
  }]
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
