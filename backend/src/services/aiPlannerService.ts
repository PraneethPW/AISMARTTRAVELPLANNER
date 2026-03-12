import axios from "axios";

export const generateTripPlan = async (
  start: string,
  destination: string,
  budget: number,
  days: number,
  interests: string
) => {
  const prompt = `
You are an AI travel planner.

Return ONLY valid JSON.

Trip Details:
Start: ${start}
Destination: ${destination}
Budget: ${budget}
Days: ${days}
Interests: ${interests}

Return JSON in this format. Use real approximate latitude and longitude for each city (e.g. Mumbai: 19.07, 72.87; Delhi: 28.61, 77.21).

{
 "route":[
   {"city":"${start}","lat":<number>,"lng":<number>},
   {"city":"intermediate city if any","lat":<number>,"lng":<number>},
   {"city":"${destination}","lat":<number>,"lng":<number>}
 ],
 "route_optimization":{
   "best_route":"",
   "alternative_routes":[]
 },
 "transport":[
   {
     "type":"",
     "route":"",
     "cost":"",
     "travel_time":""
   }
 ],
 "crowd_prediction":{
   "bus":"Low / Medium / High",
   "train":"Low / Medium / High",
   "tourist_spots":"Low / Medium / High"
 },
 "best_travel_time":"",
 "hotels":[
   {
     "name":"",
     "price_per_night":"",
     "location":""
   }
 ],
 "places":[
   {
     "name":"",
     "description":""
   }
 ],
 "total_estimated_cost":""
}
`;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("❌ OPENROUTER_API_KEY is missing in .env");
    throw new Error("AI trip planning failed: API key not configured");
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "AI Smart Travel Planner",
          "Content-Type": "application/json"
        }
      }
    );

    let text = response.data.choices[0].message.content || "{}";
    text = text.replace(/```json/g, "").replace(/```/g, "");

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        // Normalize: ensure arrays/objects exist; remove raw_response so frontend shows map/cards
        return {
          route: Array.isArray(parsed.route) ? parsed.route : [],
          route_optimization: parsed.route_optimization || {},
          transport: Array.isArray(parsed.transport) ? parsed.transport : [],
          crowd_prediction: parsed.crowd_prediction && typeof parsed.crowd_prediction === "object" ? parsed.crowd_prediction : {},
          best_travel_time: parsed.best_travel_time || "",
          hotels: Array.isArray(parsed.hotels) ? parsed.hotels : [],
          places: Array.isArray(parsed.places) ? parsed.places : [],
          total_estimated_cost: parsed.total_estimated_cost || "",
          raw_response: undefined
        };
      } catch {
        console.warn("⚠ JSON parse failed");
      }
    }

    return {
      route: [],
      transport: [],
      crowd_prediction: {},
      raw_response: text
    };

  } catch (error: any) {
    console.error("AI planner service error:", error.response?.data || error.message);
    
    // Handle specific OpenRouter errors
    if (error.response?.status === 401) {
      console.error("❌ Invalid or missing OPENROUTER_API_KEY. Check your .env file.");
    } else if (error.response?.status === 404) {
      console.error("❌ Model not found. Check https://openrouter.ai/models");
    } else if (error.response?.status === 402) {
      console.error("❌ Insufficient credits. Add funds at openrouter.ai");
    }
    
    throw new Error("AI trip planning failed");
  }
};
