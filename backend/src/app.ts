import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import tripRoutes from "./routes/tripRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
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