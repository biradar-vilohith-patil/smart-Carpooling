// backend/controllers/rideController.js

import Ride from "../models/Ride.js";
import User from "../models/User.js";

// Create a new Ride
export const createRide = async (req, res, next) => {
  try {
    const newRide = new Ride({ ...req.body, creator: req.user.id });
    await newRide.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { ridesCreated: newRide._id } });
    res.status(201).json(newRide);
  } catch (err) {
    next(err);
  }
};

// Search rides (Public route)
export const searchRides = async (req, res, next) => {
  try {
    try {
    const { origin, destination, time } = req.query;

    const query = {};

    if (origin) {
      query["origin.place"] = { $regex: origin, $options: "i" };  // Match partial origin (case-insensitive)
    }

    if (destination) {
      query["destination.place"] = { $regex: destination, $options: "i" }; // Match partial destination
    }

    if (time) {
      query["startTime"] = { $gte: new Date(time) };  // Rides starting after the selected time
    }

    const rides = await Ride.find(query);

    res.status(200).json({ rides });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rides", error: err.message });
  }

    if (!origin || !destination || !time) {
      return res.status(400).json({ message: "Origin, destination and time are required" });
    }
}

    const selectedTime = new Date(time);

    const rides = await Ride.find({
      "origin.place": { $regex: origin.trim(), $options: "i" },
      "destination.place": { $regex: destination.trim(), $options: "i" },
      startTime: { $gte: selectedTime }
    })
    .populate('creator', 'name profilePicture stars') 
    .lean();

    res.status(200).json({ rides });
  } catch (err) {
    next(err);
  }
};

// Get all rides
export const getRides = async (req, res, next) => {
  try {
    const rides = await Ride.find().populate('creator', 'name profilePicture stars').lean();
    res.status(200).json(rides);
  } catch (err) {
    next(err);
  }
};

// Get ride by ID
export const getRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('creator', 'name age profilePicture ridesCreated stars')
      .lean();
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.status(200).json(ride);
  } catch (err) {
    next(err);
  }
};

// Update ride
export const updateRide = async (req, res, next) => {
  try {
    const updatedRide = await Ride.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRide);
  } catch (err) {
    next(err);
  }
};

// Delete ride
export const deleteRide = async (req, res, next) => {
  try {
    await Ride.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { ridesCreated: req.params.id } });
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (err) {
    next(err);
  }
};
