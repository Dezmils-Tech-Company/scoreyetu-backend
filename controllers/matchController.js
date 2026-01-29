import Match from "../models/match.js";
import Standings from "../models/Standings.js";

export const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMatchResult = async (req, res) => {
  try {
    const { matchId, homeScore, awayScore, status } = req.body;
    const match = await Match.findById(matchId).populate("homeSchool awaySchool game");

    match.homeScore = homeScore;
    match.awayScore = awayScore;
    match.status = status;
    await match.save();

    await updateStandings(match);

    res.json({ message: "Match updated and standings recalculated", match });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Helper function
const updateStandings = async (match) => {
  const { homeSchool, awaySchool, game, homeScore, awayScore } = match;

  const updateStats = async (schoolId, isHome) => {
    const gf = isHome ? homeScore : awayScore;
    const ga = isHome ? awayScore : homeScore;

    let standings = await Standings.findOne({ school: schoolId, game: game._id });
    if (!standings) standings = new Standings({ school: schoolId, game: game._id });

    standings.gf += gf;
    standings.ga += ga;

    if (homeScore === awayScore) {
      standings.draws += 1;
      standings.points += 1;
    } else if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore)) {
      standings.wins += 1;
      standings.points += 3;
    } else {
      standings.losses += 1;
    }

    await standings.save();
  };

  await updateStats(homeSchool._id, true);
  await updateStats(awaySchool._id, false);
};


export const getLatestMatches = async (req, res) => {
  try {
    const matches = await Match.find({ status: "Completed" })
      .populate("homeSchool awaySchool game")
      .sort({ date: -1 })
      .limit(5); // latest 5 matches
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("homeSchool awaySchool game");
    res.json(match);
  } catch (err) {
    res.status(404).json({ error: "Match not found" });
  }
};
