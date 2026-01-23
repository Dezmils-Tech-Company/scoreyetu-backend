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
    const kisumuHigh = await School.create({ name: "Kisumu High School", location: "Kisumu" });
    const nyanzaGirls = await School.create({ name: "Nyanza Girls High School", location: "Kisumu" });
    const maseno = await School.create({ name: "Maseno School", location: "Maseno" });
    const moiGirls = await School.create({ name: "Moi Girls High School Kisumu", location: "Kisumu" });

    // --- Create Games (extendable list) ---
    const gamesList = [
      "Football", "Rugby", "Hockey", "Netball", "Athletics", "Tennis",
      "Basketball", "Volleyball", "Swimming", "Chess", "Table Tennis"
    ];

    const gameDocs = {};
    for (const g of gamesList) {
      gameDocs[g] = await Game.create({ name: g });
    }

    // --- Create Events for each sport ---
    await Event.create({
      title: "Kisumu High vs Nyanza Girls",
      sport: "Football",
      date: new Date("2026-01-04"),
      status: "Completed",
      schools: [kisumuHigh._id, nyanzaGirls._id],
      games: [gameDocs["Football"]._id],
      results: [
        { school: kisumuHigh._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 2, ga: 1 },
        { school: nyanzaGirls._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 1, ga: 2 }
      ]
    });

    await Event.create({
      title: "Maseno School vs Moi Girls Kisumu",
      sport: "Rugby",
      date: new Date("2026-01-03"),
      status: "Completed",
      schools: [maseno._id, moiGirls._id],
      games: [gameDocs["Rugby"]._id],
      results: [
        { school: maseno._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 15, ga: 12 },
        { school: moiGirls._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 12, ga: 15 }
      ]
    });

    await Event.create({
      title: "Kisumu High vs Maseno School",
      sport: "Hockey",
      date: new Date("2026-01-02"),
      status: "Completed",
      schools: [kisumuHigh._id, maseno._id],
      games: [gameDocs["Hockey"]._id],
      results: [
        { school: kisumuHigh._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 3, ga: 0 },
        { school: maseno._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 0, ga: 3 }
      ]
    });

    await Event.create({
      title: "Nyanza Girls vs Moi Girls Kisumu",
      sport: "Netball",
      date: new Date("2026-01-01"),
      status: "Completed",
      schools: [nyanzaGirls._id, moiGirls._id],
      games: [gameDocs["Netball"]._id],
      results: [
        { school: nyanzaGirls._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 18, ga: 15 },
        { school: moiGirls._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 15, ga: 18 }
      ]
    });

    await Event.create({
      title: "Kisumu High vs Maseno School",
      sport: "Athletics",
      date: new Date("2025-12-30"),
      status: "Completed",
      schools: [kisumuHigh._id, maseno._id],
      games: [gameDocs["Athletics"]._id],
      results: [
        { school: kisumuHigh._id, wins: 1, draws: 0, losses: 0, points: 3, gf: 52, ga: 48 },
        { school: maseno._id, wins: 0, draws: 0, losses: 1, points: 0, gf: 48, ga: 52 }
      ]
    });

    await Event.create({
      title: "Nyanza Girls vs Kisumu High",
      sport: "Tennis",
      date: new Date("2026-02-29"),
      status: "Upcoming",
      schools: [nyanzaGirls._id, kisumuHigh._id],
      games: [gameDocs["Tennis"]._id],
      results: [
        { school: nyanzaGirls._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
        { school: kisumuHigh._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
      ]
    });

    // Example extra games
    await Event.create({
      title: "Maseno School vs Kisumu High",
      sport: "Basketball",
      date: new Date("2026-03-05"),
      status: "Upcoming",
      schools: [maseno._id, kisumuHigh._id],
      games: [gameDocs["Basketball"]._id],
      results: [
        { school: maseno._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
        { school: kisumuHigh._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
      ]
    });

    await Event.create({
      title: "Moi Girls vs Nyanza Girls",
      sport: "Volleyball",
      date: new Date("2026-03-10"),
      status: "Upcoming",
      schools: [moiGirls._id, nyanzaGirls._id],
      games: [gameDocs["Volleyball"]._id],
      results: [
        { school: moiGirls._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 },
        { school: nyanzaGirls._id, wins: 0, draws: 0, losses: 0, points: 0, gf: 0, ga: 0 }
      ]
    });

    console.log("✅ Seed data created successfully with all games");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

await connectDB();
await seedData();
