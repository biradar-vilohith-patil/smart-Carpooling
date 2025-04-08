import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import rideRoute from "./routes/ride.routes.js";

dotenv.config(); // ✅ load env vars first

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB Atlas
const connectDB = () => {
  mongoose.set("strictQuery", true);
  console.log("Connecting to Mongo URI:", process.env.MONGO); // helpful log

  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((error) => {
      console.error("❌ MongoDB connection failed:", error);
      process.exit(1); // exit if DB fails
    });
};

// ✅ CORS for frontend on Vercel
app.use(cors({
  origin: process.env.ORIGIN, // 💡 use .env to manage CORS origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
app.options("*", cors()); // handle preflight

// ✅ Other Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ API Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);

// ✅ Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage
  });
});

// ✅ Ping route
app.get("/api/ping", (req, res) => {
  res.send("Backend is live 🚀");
});

// ✅ Start server only after DB is connected
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
