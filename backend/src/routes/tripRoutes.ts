import express from "express";
import { planTrip } from "../controllers/tripController";

const router = express.Router();

router.post("/plan", planTrip);

export default router;