// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sport: { type: String, required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["Upcoming", "Ongoing", "Completed"], 
    default: "Upcoming" 
  },
  schools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  results: [
    {
      school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
      goals: { type: Number, default: 0 },   // ✅ Admin only enters goals
      wins: { type: Number, default: 0 },    // ✅ Auto-calculated
      draws: { type: Number, default: 0 },   // ✅ Auto-calculated
      losses: { type: Number, default: 0 },  // ✅ Auto-calculated
      points: { type: Number, default: 0 },  // ✅ Auto-calculated
      gf: { type: Number, default: 0 },      // ✅ Auto-calculated
      ga: { type: Number, default: 0 }       // ✅ Auto-calculated
    }
  ]
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
