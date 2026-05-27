import axios from "axios"
import { env } from "../config/env"

const asArray = (value: any) => Array.isArray(value) ? value : value ? [value] : []
const asNumber = (value: any) => Number(value) || 0
const asString = (value: any) => value ? String(value) : ""

export const generateTripPlan = async (
  start: string,
  destination: string,
  budget: number,
  days: number,
  interests: string
) => {
  const prompt = `
You are AISMART Travel Planner, a practical travel operations AI.

Generate destination-specific recommendations for a real user trip. Use realistic Indian travel planning judgment, not generic placeholders.

Trip inputs:
- Start location: ${start}
- Destination: ${destination}
- Total budget in INR: ${budget}
- Trip days: ${days}
- User interests: ${interests}

Return ONLY valid JSON. No markdown. No explanation outside JSON.

Use this exact shape:
{
  "summary": {
    "title": "Short trip title",
    "best_time_to_start": "Best start time",
    "estimated_total_cost": 12000,
    "travel_style": "Budget / Comfort / Premium / Family / Solo",
    "overview": "2 sentence useful overview"
  },
  "route": [
    { "city": "Location name", "lat": 0, "lng": 0, "type": "start / stay / food / attraction / transit", "note": "why this stop matters" }
  ],
  "map_layers": [
    { "name": "Layer name", "items": ["specific item 1", "specific item 2"], "use_case": "how user uses it" }
  ],
  "stays": {
    "hotels": [
      { "name": "Hotel name", "area": "Area", "price_per_night": 1800, "why_pick": "specific reason", "best_for": "family/couple/solo", "distance_note": "near..." }
    ],
    "hostels": [
      { "name": "Hostel name", "area": "Area", "price_per_night": 700, "why_pick": "specific reason", "best_for": "backpackers/solo", "distance_note": "near..." }
    ],
    "pgs": [
      { "name": "PG/long stay area or option", "area": "Area", "monthly_estimate": 9000, "why_pick": "specific reason", "best_for": "students/interns/work trip", "distance_note": "near..." }
    ]
  },
  "food": [
    { "name": "Restaurant or food lane", "area": "Area", "meal": "breakfast/lunch/snack/dinner", "price_for_two": 500, "must_try": "dish", "why_pick": "specific reason" }
  ],
  "famous_places": [
    { "name": "Place name", "category": "fort/beach/temple/museum/market/etc", "best_time": "time", "duration": "2 hours", "entry_fee": "free/amount", "why_visit": "specific reason", "nearby_food": "food option nearby" }
  ],
  "transport": [
    { "type": "Flight/Train/Bus/Cab/Metro/Rental", "route": "specific route", "cost": 1200, "travel_time": "3 hours", "comfort": "Low/Medium/High", "booking_tip": "useful tip", "best_for": "budget/time/family" }
  ],
  "timeline": [
    { "day": 1, "time": "09:00", "title": "Activity", "location": "Place", "duration": "1 hour", "cost": 200, "notes": "practical note" }
  ],
  "crowd_prediction": {
    "bus": "Low/Medium/High + short reason",
    "train": "Low/Medium/High + short reason",
    "tourist_spots": "Low/Medium/High + short reason"
  },
  "budget_breakdown": [
    { "category": "Stay/Food/Transport/Activities/Buffer", "amount": 1000, "note": "why" }
  ],
  "local_tips": ["specific safety or planning tip"],
  "packing_list": ["item based on destination and season"]
}

Rules:
- Make all recommendations specific to ${destination}.
- Include at least 5 route points with useful coordinates.
- Include at least 4 hotels, 4 hostels, 3 PG/long-stay suggestions, 6 food options, 8 famous places, 5 transport options, and ${Math.max(days * 5, 6)} timeline rows.
- Keep total cost realistic for the user's budget.
- If exact hotel availability is uncertain, recommend realistic areas/options and clearly phrase them as suggestions.
`

  try {
    const response = await axios.post(
      `${env.openRouterBaseUrl}/chat/completions`,
      {
        model: env.openRouterModel,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.45,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${env.openRouterApiKey}`,
          "Content-Type": "application/json"
        }
      }
    )

    let text = response.data.choices[0].message.content
    text = text.replace(/```json/g, "").replace(/```/g, "")

    const jsonMatch = text.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      throw new Error("Invalid AI JSON response")
    }

    const aiResponse = JSON.parse(jsonMatch[0])
    const stays = aiResponse.stays || {}
    const crowdPrediction = aiResponse.crowd_prediction || aiResponse.crowdPrediction || {}

    return {
      summary: {
        title: asString(aiResponse.summary?.title) || `${destination} trip from ${start}`,
        best_time_to_start: asString(aiResponse.summary?.best_time_to_start),
        estimated_total_cost: asNumber(aiResponse.summary?.estimated_total_cost) || budget,
        travel_style: asString(aiResponse.summary?.travel_style),
        overview: asString(aiResponse.summary?.overview),
      },
      route: asArray(aiResponse.route).map((routePoint: any) => ({
        city: asString(routePoint.city || routePoint.name),
        lat: asNumber(routePoint.lat),
        lng: asNumber(routePoint.lng),
        type: asString(routePoint.type),
        note: asString(routePoint.note),
      })),
      map_layers: asArray(aiResponse.map_layers).map((layer: any) => ({
        name: asString(layer.name),
        items: asArray(layer.items).map(asString),
        use_case: asString(layer.use_case),
      })),
      stays: {
        hotels: asArray(stays.hotels).map((hotel: any) => ({
          name: asString(hotel.name),
          area: asString(hotel.area || hotel.location),
          price_per_night: asNumber(hotel.price_per_night || hotel.pricePerNight),
          why_pick: asString(hotel.why_pick || hotel.whyPick),
          best_for: asString(hotel.best_for || hotel.bestFor),
          distance_note: asString(hotel.distance_note || hotel.distanceNote),
        })),
        hostels: asArray(stays.hostels).map((hostel: any) => ({
          name: asString(hostel.name),
          area: asString(hostel.area || hostel.location),
          price_per_night: asNumber(hostel.price_per_night || hostel.pricePerNight),
          why_pick: asString(hostel.why_pick || hostel.whyPick),
          best_for: asString(hostel.best_for || hostel.bestFor),
          distance_note: asString(hostel.distance_note || hostel.distanceNote),
        })),
        pgs: asArray(stays.pgs || stays.pg).map((pg: any) => ({
          name: asString(pg.name),
          area: asString(pg.area || pg.location),
          monthly_estimate: asNumber(pg.monthly_estimate || pg.monthlyEstimate),
          why_pick: asString(pg.why_pick || pg.whyPick),
          best_for: asString(pg.best_for || pg.bestFor),
          distance_note: asString(pg.distance_note || pg.distanceNote),
        })),
      },
      food: asArray(aiResponse.food).map((food: any) => ({
        name: asString(food.name),
        area: asString(food.area),
        meal: asString(food.meal),
        price_for_two: asNumber(food.price_for_two || food.priceForTwo),
        must_try: asString(food.must_try || food.mustTry),
        why_pick: asString(food.why_pick || food.whyPick),
      })),
      famous_places: asArray(aiResponse.famous_places || aiResponse.places).map((place: any) => ({
        name: asString(place.name),
        category: asString(place.category),
        best_time: asString(place.best_time || place.bestTime),
        duration: asString(place.duration),
        entry_fee: asString(place.entry_fee || place.entryFee),
        why_visit: asString(place.why_visit || place.description || place.whyVisit),
        nearby_food: asString(place.nearby_food || place.nearbyFood),
      })),
      transport: asArray(aiResponse.transport).map((transport: any) => ({
        type: asString(transport.type),
        route: asString(transport.route),
        cost: asNumber(transport.cost),
        travel_time: asString(transport.travel_time || transport.travelTime),
        comfort: asString(transport.comfort),
        booking_tip: asString(transport.booking_tip || transport.bookingTip),
        best_for: asString(transport.best_for || transport.bestFor),
      })),
      timeline: asArray(aiResponse.timeline).map((item: any) => ({
        day: asNumber(item.day) || 1,
        time: asString(item.time),
        title: asString(item.title),
        location: asString(item.location),
        duration: asString(item.duration),
        cost: asNumber(item.cost),
        notes: asString(item.notes),
      })),
      crowd_prediction: {
        bus: asString(crowdPrediction.bus) || "Medium",
        train: asString(crowdPrediction.train) || "Medium",
        tourist_spots: asString(crowdPrediction.tourist_spots || crowdPrediction.touristSpots) || "Moderate",
      },
      budget_breakdown: asArray(aiResponse.budget_breakdown || aiResponse.budgetBreakdown).map((item: any) => ({
        category: asString(item.category),
        amount: asNumber(item.amount),
        note: asString(item.note),
      })),
      local_tips: asArray(aiResponse.local_tips || aiResponse.localTips).map(asString),
      packing_list: asArray(aiResponse.packing_list || aiResponse.packingList).map(asString),
    }
  } catch (error) {
    console.error("AI planner error:", error)

    return {
      summary: {
        title: `${destination} trip from ${start}`,
        best_time_to_start: "",
        estimated_total_cost: budget,
        travel_style: "",
        overview: "AI planning failed, so no generated recommendations are available yet.",
      },
      route: [],
      map_layers: [],
      stays: { hotels: [], hostels: [], pgs: [] },
      food: [],
      famous_places: [],
      transport: [],
      timeline: [],
      crowd_prediction: {
        bus: "Medium",
        train: "Medium",
        tourist_spots: "Moderate",
      },
      budget_breakdown: [],
      local_tips: [],
      packing_list: [],
    }
  }
}
