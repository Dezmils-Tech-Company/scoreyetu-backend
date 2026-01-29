import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ----------------------
// Import Routes
// ----------------------
import schoolRoutes from "./routes/schoolRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import matchRoutes from "./routes/matchRoutes.js"; 
import standingsRoutes from "./routes/standingsRoutes.js";

// ----------------------
// Use Routes
// ----------------------
app.use("/api/schools", schoolRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/matches", matchRoutes); 
app.use("/api/standings", standingsRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("ScoreYetu API is running...");
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
