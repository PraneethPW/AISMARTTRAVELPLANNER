import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import tripRoutes from "./routes/tripRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { env } from "./config/env";

const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());

// health route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Smart Travel Planner API running"
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);

// error handler
app.use(errorHandler);

export default app;
