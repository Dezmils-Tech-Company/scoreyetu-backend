import express from "express";
import { upsertUser, getUsers, getUserByEmail } from "../controllers/userController.js";

const router = express.Router();

router.put("/users", upsertUser);
router.get("/users", getUsers);
router.get("/users/:email", getUserByEmail);

export default router;
