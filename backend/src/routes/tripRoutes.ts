import express from "express"
import { planTrip, getUserTrips, getTripById } from "../controllers/tripController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/plan", authMiddleware, planTrip)

router.get("/my-trips", authMiddleware, getUserTrips)

router.get("/:id", authMiddleware, getTripById)

export default router