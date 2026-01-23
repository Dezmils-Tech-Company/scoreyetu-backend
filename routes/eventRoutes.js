import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  getEventSchools,
  getEventGames
} from "../controllers/eventController.js";

const router = express.Router();

// 📅 Events
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.get("/:id/schools", getEventSchools);
router.get("/:id/games", getEventGames);

export default router;
