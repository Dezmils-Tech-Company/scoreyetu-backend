import mongoose from "mongoose";
import dotenv from "dotenv";

import School from "./models/School.js";
import Game from "./models/Game.js";
import Match from "./models/Match.js";
import Standings from "./models/Standings.js";

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
    await Promise.all([
      School.deleteMany(),
      Game.deleteMany(),
      Match.deleteMany(),
      Standings.deleteMany()
    ]);
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
      { name: "Basketball" }
    ]);

    // --- Generate Matches ---
    const matches = [];
    games.forEach((game) => {
      for (let i = 0; i < 10; i++) {
        const home = schools[Math.floor(Math.random() * schools.length)];
        let away = schools[Math.floor(Math.random() * schools.length)];
        while (away._id.equals(home._id)) {
          away = schools[Math.floor(Math.random() * schools.length)];
        }

        const homeScore = Math.floor(Math.random() * 5);
        const awayScore = Math.floor(Math.random() * 5);

        matches.push({
          homeSchool: home._id,
          awaySchool: away._id,
          game: game._id,
          homeScore,
          awayScore,
          date: new Date(2026, 0, i + 1),
          status: "Completed"
        });
      }
    });

    await Match.insertMany(matches);
    console.log(`✅ Seeded ${matches.length} matches across ${games.length} games`);

    // --- Create Standings (10 per game, one per school) ---
    const standings = [];
    games.forEach((game) => {
      schools.forEach((school) => {
        standings.push({
          game: game._id,
          school: school._id,
          wins: Math.floor(Math.random() * 5),
          draws: Math.floor(Math.random() * 3),
          losses: Math.floor(Math.random() * 5),
          gf: Math.floor(Math.random() * 20),
          ga: Math.floor(Math.random() * 20),
          points: Math.floor(Math.random() * 15)
        });
      });
    });

    await Standings.insertMany(standings);
    console.log(`✅ Seeded ${standings.length} standings entries`);

    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

await connectDB();
await seedData();
