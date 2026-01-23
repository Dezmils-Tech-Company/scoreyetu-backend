import express from "express";
import {
  getGames,
  getGameById,
  createGame,
  getGameSchools,
  getGamePlayers
} from "../controllers/gameController.js";

const router = express.Router();

// 🏆 Games
router.get("/", getGames);
router.get("/:id", getGameById);
router.post("/", createGame);
router.get("/:id/schools", getGameSchools);
router.get("/:id/players", getGamePlayers);

export default router;
