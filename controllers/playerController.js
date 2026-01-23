// controllers/playerController.js
import Player from "../models/Player.js";
import mongoose from "mongoose";

// Get all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("school games");
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single player by ID
export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid player ID" });
    }
    const player = await Player.findById(id).populate("school games");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new player
export const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    const saved = await player.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get games for a player
export const getPlayerGames = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("games");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player.games);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get school for a player
export const getPlayerSchool = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("school");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player.school);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
