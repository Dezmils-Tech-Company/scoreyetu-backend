// controllers/eventController.js
import Event from "../models/Event.js";
import Standings from "../models/Standings.js";

// ✅ Fetch all events grouped by sport
export const getEvents = async (req, res) => {
  try {
    const events = await Event.aggregate([
      { $group: { _id: "$sport", matches: { $push: "$$ROOT" } } }
    ]);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fetch single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("schools games results.school");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: "Invalid event ID" });
  }
};

// ✅ Create event and auto-calculate standings
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();

    if (saved.status === "Completed" && saved.results.length === 2) {
      const [teamA, teamB] = saved.results;

      // Premier League logic
      let teamAStats = { wins: 0, draws: 0, losses: 0, points: 0 };
      let teamBStats = { wins: 0, draws: 0, losses: 0, points: 0 };

      if (teamA.goals > teamB.goals) {
        teamAStats = { wins: 1, points: 3 };
        teamBStats = { losses: 1 };
      } else if (teamA.goals < teamB.goals) {
        teamBStats = { wins: 1, points: 3 };
        teamAStats = { losses: 1 };
      } else {
        teamAStats = { draws: 1, points: 1 };
        teamBStats = { draws: 1, points: 1 };
      }

      // Update standings for Team A
      await Standings.updateOne(
        { school: teamA.school, sport: saved.sport },
        {
          $inc: {
            gf: teamA.goals,
            ga: teamB.goals,
            wins: teamAStats.wins || 0,
            draws: teamAStats.draws || 0,
            losses: teamAStats.losses || 0,
            points: teamAStats.points || 0
          }
        },
        { upsert: true }
      );

      // Update standings for Team B
      await Standings.updateOne(
        { school: teamB.school, sport: saved.sport },
        {
          $inc: {
            gf: teamB.goals,
            ga: teamA.goals,
            wins: teamBStats.wins || 0,
            draws: teamBStats.draws || 0,
            losses: teamBStats.losses || 0,
            points: teamBStats.points || 0
          }
        },
        { upsert: true }
      );
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get schools in an event
export const getEventSchools = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("schools");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event.schools);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get games in an event
export const getEventGames = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("games");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event.games);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get standings (Premier League table)
export const getStandings = async (req, res) => {
  try {
    const standings = await Standings.find({ sport: req.params.sport })
      .populate("school")
      .sort({ points: -1, gf: -1, ga: 1 });
    res.json(standings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
