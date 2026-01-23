import express from "express";
import { getSchools, getSchoolById, createSchool, getSchoolPlayers, getSchoolGames, getSchoolEvents } from "../controllers/schoolController.js";

const router = express.Router();

router.get("/", getSchools);
router.get("/:id", getSchoolById);
router.post("/", createSchool);
router.get("/:id/players", getSchoolPlayers);
router.get("/:id/games", getSchoolGames);
router.get("/:id/events", getSchoolEvents);

export default router;
