import express from "express";
import { createRide, deleteRide, getRide, getRides, updateRide } from "../controllers/rideController.js";
import { verifyUser } from "../utils/verifyToken.js";
import Ride from "../models/Ride.js";

const router = express.Router();

// 💡 Make publish ride protected
router.post("/", verifyUser, createRide);

// 💡 Anyone can search rides
router.get("/find", async (req, res) => {
  try {
    const { origin, destination, time } = req.query;

    if (!origin || !destination || !time) {
      return res.status(400).json({ error: "Missing search parameters" });
    }

    const rides = await Ride.find({
      "origin.place": { $regex: origin, $options: "i" },
      "destination.place": { $regex: destination, $options: "i" },
      startTime: { $gte: new Date(time) },
    });

    res.status(200).json({ rides });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching rides" });
  }
});

// 💡 Protect these other routes
router.get("/:id", verifyUser, getRide);
router.put("/:id", verifyUser, updateRide);
router.delete("/:id", verifyUser, deleteRide);
router.get("/", getRides);

export default router;
