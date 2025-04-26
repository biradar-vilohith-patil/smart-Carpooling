// backend/routes/rides.js

import express from "express";
import { createRide, deleteRide, getRide, getRides, searchRides, updateRide } from "../controllers/rideController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// POST - Create a ride => Needs Login
router.post("/", verifyUser, createRide);

// GET - Search rides (no login required!)
router.get("/find", searchRides);

// GET - All rides
router.get("/", getRides);

// GET - Single ride
router.get("/:id", getRide);

// PUT - Update ride
router.put("/:id", verifyUser, updateRide);

// DELETE - Delete ride
router.delete("/:id", verifyUser, deleteRide);

export default router;
