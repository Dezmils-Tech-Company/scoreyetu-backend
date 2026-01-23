import mongoose from "mongoose";
import dotenv from "dotenv";

import School from "./models/School.js";
import Player from "./models/Player.js";
import Game from "./models/Game.js";
import Event from "./models/Event.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // --- Schools ---
    const schools = await School.insertMany([
      { name: "Ramba Boys", location: "Siaya" },
      { name: "Maseno School", location: "Maseno" },
      { name: "Kisumu Girls", location: "Kisumu" },
      { name: "Maranda School", location: "Maseno" },
      { name: "Kisumu Boys", location: "Kisumu" },
      { name: "Ekwanda Mixed school", location: "Maseno" },
      { name: "Ng'iya Girls", location: "Kisumu" }
    ]);

    // --- Games ---
    const games = await Game.insertMany([
      { name: "Basketball", description: "Team sport with hoops" },
      { name: "Volleyball", description: "Team sport with net" },
      { name: "Swimming", description: "Aquatic competition" },
      { name: "Roll Ball", description: "Skate game" },
      { name: "Tennis", description: "table,long tenis" }
    ]);

    // --- Players ---
    const players = await Player.insertMany([
      {
        name: "Alice Atieno",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
        sport: "Basketball",
        position: "Guard",
        school: schools[0]._id,
        games: [games[0]._id],
        achievements: ["MVP 2025"],
        stats: { matchesPlayed: 12, goalsScored: 200, assists: 50 }
      },
      {
        name: "Brian Ouma",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        sport: "Volleyball",
        position: "Setter",
        school: schools[1]._id,
        games: [games[1]._id],
        achievements: ["Best Server"],
        stats: { matchesPlayed: 15, goalsScored: 0, assists: 120 }
      },
      {
        name: "John Odipo",
        photo: "https://res.cloudinary.com/daecietav/image/upload/v1768994094/mmmos_kmp59g.jpg",
        position: "Freestyle",
        school: schools[2]._id,
        games: [games[2]._id],
        achievements: ["Gold Medal 100m Freestyle"],
        stats: { matchesPlayed: 8, goalsScored: 0, assists: 0 }
      }
    ]);

    // --- Events ---
    await Event.insertMany([
      {
        title: "Ramba Boys vs Maseno School",
        sport: "Basketball",
        date: new Date("2026-01-15"),
        status: "Completed",
        schools: [schools[0]._id, schools[1]._id],
        games: [games[0]._id],
        results: [
          { school: schools[0]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 65, ga: 60 },
          { school: schools[1]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 60, ga: 65 }
        ]
      },
      {
        title: "Ng'iya Girls vs Kisumu Girls",
        sport: "Volleyball",
        date: new Date("2026-01-20"),
        status: "Completed",
        schools: [schools[1]._id, schools[2]._id],
        games: [games[1]._id],
        results: [
          { school: schools[1]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 3, ga: 1 },
          { school: schools[2]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 1, ga: 3 }
        ]
      },
      {
        title: "Ramba Boys vs Kisumu Boys",
        sport: "Swimming",
        date: new Date("2026-01-25"),
        status: "Upcoming",
        schools: [schools[0]._id, schools[2]._id],
        games: [games[2]._id],
        results: [
          { school: schools[0]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
          { school: schools[2]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
        ]
      }
    ]);

    console.log("✅ Seed data appended successfully (3+ per schema)");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

await connectDB();
await seedData();
