import { Request, Response } from "express"
import { generateTripPlan } from "../services/aiPlannerService"
import { saveTrip } from "../models/tripModel"

export const planTrip = async (req: Request, res: Response) => {

  try {

    const { start, destination, budget, days, interests } = req.body

    const plan = await generateTripPlan(
      start,
      destination,
      budget,
      days,
      interests
    )

    // Save trip to Neon DB
    await saveTrip(
      start,
      destination,
      budget,
      days,
      interests,
      plan
    )

    // IMPORTANT: return only the plan
    res.json({
      success: true,
      data: plan
    })

  } catch (error) {

    console.error("Trip planner error:", error)

    res.status(500).json({
      success: false,
      message: "Trip planning failed"
    })

  }

}