import Game from "../models/Game.js";
import School from "../models/School.js";
import Player from "../models/Player.js";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: "Invalid game ID" });
  }
};

export const createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getGameSchools = async (req, res) => {
  try {
    const schools = await School.find({ games: req.params.id });
    res.json(schools);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getGamePlayers = async (req, res) => {
  try {
    const players = await Player.find({ games: req.params.id }).populate("school");
    res.json(players);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
