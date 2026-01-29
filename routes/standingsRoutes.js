import express from "express";
import { getStandingsByGame } from "../controllers/standingsController.js";

const router = express.Router();

router.get("/:gameId", getStandingsByGame);

export default router;
