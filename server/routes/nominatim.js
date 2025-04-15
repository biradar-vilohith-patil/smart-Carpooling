// routes/nominatim.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/geocode", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Missing query param 'q'" });
    }

    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q,
        format: "json",
        addressdetails: 1,
        limit: 5,
        countrycodes: "in"
      },
      headers: {
        "User-Agent": "SmartCarpoolingApp"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Nominatim Error:", error.message);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
});

export default router;
