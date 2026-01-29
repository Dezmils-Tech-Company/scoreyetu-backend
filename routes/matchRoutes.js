import express from "express";
import { createMatch, updateMatchResult, getLatestMatches, getMatchById } from "../controllers/matchController.js";

const router = express.Router();

router.post("/", createMatch);
router.put("/update", updateMatchResult);
router.get("/latest", getLatestMatches);
router.get("/:id", getMatchById);

export default router;
