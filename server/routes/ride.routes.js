import express from "express";
import { createRide, searchRides, getRides, getRide } from "../controllers/rideController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// POST => Create a new ride
router.post("/", verifyToken, createRide);

// GET => Find rides (for search page)
router.get("/find", searchRide);

// GET => Get all rides
router.get("/", getRides);

// GET => Get ride by id
router.get("/:id", getRide);

export default router;
