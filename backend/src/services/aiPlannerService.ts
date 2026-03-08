import { openrouter } from "../config/openrouter";

export const generateTripPlan = async (
  start: string,
  destination: string,
  budget: number,
  days: number,
  interests: string
) => {

  const prompt = `
You are an AI travel planner.

IMPORTANT:
Return ONLY valid JSON.
Do NOT include explanations, markdown, or comments.

Trip Details:
Start: ${start}
Destination: ${destination}
Budget: ${budget}
Days: ${days}
Interests: ${interests}

Return JSON in this exact format:

{
 "route":[
   {"city":"${start}","lat":0,"lng":0},
   {"city":"intermediate city","lat":0,"lng":0},
   {"city":"${destination}","lat":0,"lng":0}
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

  try {

    const response = await openrouter.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    let text = response.choices[0].message.content || "{}";

    // Remove markdown blocks
    text = text.replace(/```json/g, "").replace(/```/g, "");

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if(jsonMatch){
      try{
        return JSON.parse(jsonMatch[0]);
      }catch(err){
        console.warn("⚠ JSON parsing failed, returning fallback");
      }
    }

    return {
      route: [],
      transport: [],
      crowd_prediction: {},
      raw_response: text
    };

  } catch (error) {

    console.error("AI planner service error:", error);

    throw new Error("AI trip planning failed");

  }

};