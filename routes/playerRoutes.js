import express from "express";
import { getPlayers, getPlayerById, createPlayer, getPlayerGames, getPlayerSchool } from "../controllers/playerController.js";

const router = express.Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.post("/", createPlayer);
router.get("/:id/games", getPlayerGames);
router.get("/:id/school", getPlayerSchool);

export default router;
