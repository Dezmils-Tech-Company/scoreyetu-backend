import Standings from "../models/Standings.js";

export const getStandingsByGame = async (req, res) => {
  try {
    const standings = await Standings.find({ game: req.params.gameId })
      .populate("school")
      .sort({ points: -1, gf: -1 });
    res.json(standings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
