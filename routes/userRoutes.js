import express from "express";
import { upsertUser, getUsers, getUserByEmail, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/users", upsertUser);          // Register or update user
router.get("/users", getUsers);            // Get all users
router.get("/users/:email", getUserByEmail); // Get user by email
router.delete("/users/:id", deleteUser);   // Delete user

export default router;
