import express from "express";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { logger } from "./utils/logger";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Smart Travel Planner API running"
  });
});

app.use("/api/trip", tripRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

export default app;