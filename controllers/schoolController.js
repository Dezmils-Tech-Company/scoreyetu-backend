// controllers/schoolController.js
import mongoose from "mongoose";
import School from "../models/School.js";
import Player from "../models/Player.js";

export const getSchools = async (req, res) => {
  try {
    const schools = await School.find()
      .populate("players games recentEvents upcomingEvents");
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid school ID" });
    }
    const school = await School.findById(id)
      .populate("players games recentEvents upcomingEvents");
    if (!school) return res.status(404).json({ message: "School not found" });
    res.json(school);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 This was missing — add it
export const createSchool = async (req, res) => {
  try {
    const school = new School(req.body);
    const saved = await school.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSchoolPlayers = async (req, res) => {
  try {
    const players = await Player.find({ school: req.params.id }).populate("games");
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSchoolGames = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate("games");
    res.json(school.games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSchoolEvents = async (req, res) => {
  try {
    const school = await School.findById(req.params.id)
      .populate("recentEvents upcomingEvents");
    res.json({
      recentEvents: school.recentEvents,
      upcomingEvents: school.upcomingEvents
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
