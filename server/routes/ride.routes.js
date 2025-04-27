import express from "express";
import { createRide, findRide, getAllRides, getRideById } from "../controllers/rideController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// POST => Create a new ride
router.post("/", verifyToken, createRide);

// GET => Find rides (for search page)
router.get("/find", findRide);

// GET => Get all rides
router.get("/", getAllRides);

// GET => Get ride by id
router.get("/:id", getRideById);

export default router;
