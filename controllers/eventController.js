import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("schools games results.school");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEventSchools = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("schools");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event.schools);
  } catch (err) {
    res.status(400).json({ message: "Invalid event ID" });
  }
};

export const getEventGames = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("games");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event.games);
  } catch (err) {
    res.status(400).json({ message: "Invalid event ID" });
  }
};
