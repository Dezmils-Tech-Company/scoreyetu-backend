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
    // Clear existing data
    await School.deleteMany();
    await Player.deleteMany();
    await Game.deleteMany();
    await Event.deleteMany();

    console.log("🗑️ Cleared old data");

    // --- Create Schools ---
    const schools = await School.insertMany([
      { name: "Maseno School", location: "Maseno" },
      { name: "Ng'iya Girls", location: "Siaya" },
      { name: "St Marys Yala", location: "Yala" },
      { name: "Ekwanda Mixed", location: "Kakamega" },
      { name: "Ebusakami Girls", location: "Vihiga" },
      { name: "Esibeye Secondary", location: "Busia" },
      { name: "Esibila Secondary", location: "Busia" },
      { name: "Kuoyo Mixed", location: "Kisumu" },
      { name: "Esalwa Secondary", location: "Vihiga" },
      { name: "Ebuyala Secondary", location: "Kakamega" }
    ]);

    // --- Create Games ---
    const games = await Game.insertMany([
      { name: "Football" },
      { name: "Rugby" },
      { name: "Hockey" },
      { name: "Netball" },
      { name: "Athletics" },
      { name: "Tennis" },
      { name: "Basketball" },
      { name: "Volleyball" }
    ]);

    const gameMap = {};
    games.forEach(g => { gameMap[g.name] = g; });

    // --- Create Players ---
    const players = await Player.insertMany([
      {
        name: "John Otieno",
        sport: "Football",
        position: "Striker",
        school: schools[0]._id,
        games: [gameMap["Football"]._id],
        achievements: ["Top scorer 2025"],
        stats: { matchesPlayed: 20, goalsScored: 15, assists: 5 }
      },
      {
        name: "Mary Achieng",
        sport: "Rugby",
        position: "Forward",
        school: schools[1]._id,
        games: [gameMap["Rugby"]._id],
        achievements: ["Best Tackler 2025"],
        stats: { matchesPlayed: 18, goalsScored: 5, assists: 10 }
      },
      {
        name: "Peter Mwangi",
        sport: "Athletics",
        position: "Sprinter",
        school: schools[2]._id,
        games: [gameMap["Athletics"]._id],
        achievements: ["Gold Medal 100m"],
        stats: { matchesPlayed: 10, goalsScored: 0, assists: 0 }
      },
      {
        name: "Grace Wanjiru",
        sport: "Hockey",
        position: "Goalkeeper",
        school: schools[3]._id,
        games: [gameMap["Hockey"]._id],
        achievements: ["Best Goalkeeper 2025"],
        stats: { matchesPlayed: 12, goalsScored: 0, assists: 0 }
      },
      {
        name: "Samuel Oduor",
        sport: "Netball",
        position: "Center",
        school: schools[4]._id,
        games: [gameMap["Netball"]._id],
        achievements: ["Best Playmaker"],
        stats: { matchesPlayed: 14, goalsScored: 30, assists: 40 }
      },
      {
        name: "Linda Akoth",
        sport: "Tennis",
        position: "Singles",
        school: schools[5]._id,
        games: [gameMap["Tennis"]._id],
        achievements: ["County Champion"],
        stats: { matchesPlayed: 9, goalsScored: 0, assists: 0 }
      },
      {
        name: "Brian Ouma",
        sport: "Basketball",
        position: "Guard",
        school: schools[6]._id,
        games: [gameMap["Basketball"]._id],
        achievements: ["MVP 2025"],
        stats: { matchesPlayed: 15, goalsScored: 200, assists: 50 }
      },
      {
        name: "Cynthia Wanjiru",
        sport: "Volleyball",
        position: "Setter",
        school: schools[7]._id,
        games: [gameMap["Volleyball"]._id],
        achievements: ["Best Server"],
        stats: { matchesPlayed: 12, goalsScored: 0, assists: 120 }
      },
      {
        name: "Kevin Otieno",
        sport: "Football",
        position: "Defender",
        school: schools[8]._id,
        games: [gameMap["Football"]._id],
        achievements: ["Best Defender"],
        stats: { matchesPlayed: 22, goalsScored: 2, assists: 3 }
      },
      {
        name: "Alice Atieno",
        sport: "Rugby",
        position: "Wing",
        school: schools[9]._id,
        games: [gameMap["Rugby"]._id],
        achievements: ["Fastest Runner"],
        stats: { matchesPlayed: 16, goalsScored: 8, assists: 6 }
      }
    ]);

    // --- Create Events (10 entries) ---
    await Event.insertMany([
      {
        title: "Maseno vs Ng'iya Girls",
        sport: "Football",
        date: new Date("2026-01-04"),
        status: "Completed",
        schools: [schools[0]._id, schools[1]._id],
        games: [gameMap["Football"]._id],
        results: [
          { school: schools[0]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 2, ga: 1 },
          { school: schools[1]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 1, ga: 2 }
        ]
      },
      {
        title: "St Marys Yala vs Ekwanda Mixed",
        sport: "Rugby",
        date: new Date("2026-01-03"),
        status: "Completed",
        schools: [schools[2]._id, schools[3]._id],
        games: [gameMap["Rugby"]._id],
        results: [
          { school: schools[2]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 15, ga: 12 },
          { school: schools[3]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 12, ga: 15 }
        ]
      },
      {
        title: "Ebusakami Girls vs Esibeye Secondary",
        sport: "Hockey",
        date: new Date("2026-01-02"),
        status: "Completed",
        schools: [schools[4]._id, schools[5]._id],
        games: [gameMap["Hockey"]._id],
        results: [
          { school: schools[4]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 3, ga: 0 },
          { school: schools[5]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 0, ga: 3 }
        ]
      },
      {
        title: "Esibila Secondary vs Kuoyo Mixed",
        sport: "Netball",
        date: new Date("2026-01-01"),
        status: "Completed",
        schools: [schools[6]._id, schools[7]._id],
        games: [gameMap["Netball"]._id],
        results: [
          { school: schools[6]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 18, ga: 15 },
          { school: schools[7]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 15, ga: 18 }
        ]
      },
            {
        title: "Esalwa Secondary vs Ebuyala Secondary",
        sport: "Athletics",
        date: new Date("2025-12-30"),
        status: "Completed",
        schools: [schools[8]._id, schools[9]._id],
        games: [gameMap["Athletics"]._id],
        results: [
          { school: schools[8]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 52, ga: 48 },
          { school: schools[9]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 48, ga: 52 }
        ]
      },
      {
        title: "Maseno vs St Marys Yala",
        sport: "Basketball",
        date: new Date("2026-03-05"),
        status: "Upcoming",
        schools: [schools[0]._id, schools[2]._id],
        games: [gameMap["Basketball"]._id],
        results: [
          { school: schools[0]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
          { school: schools[2]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
        ]
      },
      {
        title: "Ng'iya Girls vs Ekwanda Mixed",
        sport: "Volleyball",
        date: new Date("2026-03-10"),
        status: "Upcoming",
        schools: [schools[1]._id, schools[3]._id],
        games: [gameMap["Volleyball"]._id],
        results: [
          { school: schools[1]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
          { school: schools[3]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
        ]
      },
      {
        title: "Ebusakami Girls vs Esibila Secondary",
        sport: "Tennis",
        date: new Date("2026-02-29"),
        status: "Upcoming",
        schools: [schools[4]._id, schools[6]._id],
        games: [gameMap["Tennis"]._id],
        results: [
          { school: schools[4]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
          { school: schools[6]._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
        ]
      },
      {
        title: "Esibeye Secondary vs Kuoyo Mixed",
        sport: "Football",
        date: new Date("2026-01-15"),
        status: "Completed",
        schools: [schools[5]._id, schools[7]._id],
        games: [gameMap["Football"]._id],
        results: [
          { school: schools[5]._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 3, ga: 2 },
          { school: schools[7]._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 2, ga: 3 }
        ]
      }
    ]);

    console.log("✅ Seed data created successfully with 10 schools, players, games, and events");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

await connectDB();
await seedData();
