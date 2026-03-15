import axios from "axios"

export const generateTripPlan = async (
  start: string,
  destination: string,
  budget: number,
  days: number,
  interests: string
) => {

const prompt = `
You are an expert travel planning AI.

Generate a realistic travel plan.

Start: ${start}
Destination: ${destination}
Budget: ${budget}
Days: ${days}
Interests: ${interests}

Return ONLY JSON in this exact format:

{
 "route":[
   {"city":"${start}","lat":17.3850,"lng":78.4867},
   {"city":"${destination}","lat":13.0827,"lng":80.2707}
 ],
 "transport":[
   {"type":"Train","route":"${start} to ${destination} Express","cost":"800","travel_time":"10 hours"},
   {"type":"Bus","route":"Sleeper Bus ${start} to ${destination}","cost":"600","travel_time":"12 hours"},
   {"type":"Flight","route":"Direct Flight ${start} to ${destination}","cost":"4000","travel_time":"1 hour"}
 ],
 "crowd_prediction":{
   "bus":"Medium",
   "train":"High",
   "tourist_spots":"Moderate"
 },
 "hotels":[
   {"name":"City Hotel","price_per_night":"1500","location":"City Center"}
 ],
 "places":[
   {"name":"Popular Beach","description":"Beautiful tourist destination"}
 ]
}
`

try{

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"openai/gpt-4o-mini",
messages:[
{
role:"user",
content:prompt
}
],
temperature:0.7
},
{
headers:{
Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json"
}
}
)

let text = response.data.choices[0].message.content

console.log("Raw AI response:",text)

/* REMOVE MARKDOWN */
text = text.replace(/```json/g,"").replace(/```/g,"")

const jsonMatch = text.match(/\{[\s\S]*\}/)

if(!jsonMatch){
throw new Error("Invalid AI JSON response")
}

const aiResponse = JSON.parse(jsonMatch[0])

/* -------- NORMALIZATION -------- */

// ROUTE
const route = (aiResponse.route || []).map((r:any)=>({
city:r.city || "",
lat:Number(r.lat) || 0,
lng:Number(r.lng) || 0
}))


// TRANSPORT
let transport:any[] = []

if(Array.isArray(aiResponse.transport)){
transport = aiResponse.transport
}
else if(aiResponse.transport){
transport = [aiResponse.transport]
}

const normalizedTransport = transport.map((t:any)=>({
type:t.type || "",
route:t.route || "",
cost:Number(t.cost) || 0,
travel_time:t.travel_time || t.travelTime || ""
}))


// CROWD PREDICTION
const crowdPrediction =
aiResponse.crowd_prediction ||
aiResponse.crowdPrediction ||
{}

const normalizedCrowd = {
bus:crowdPrediction.bus || "Medium",
train:crowdPrediction.train || "Medium",
tourist_spots:crowdPrediction.tourist_spots || crowdPrediction.touristSpots || "Moderate"
}


// HOTELS
const hotels = (aiResponse.hotels || []).map((h:any)=>({
name:h.name || "",
price_per_night:Number(h.price_per_night || h.pricePerNight) || 0,
location:h.location || ""
}))


// PLACES
const places = (aiResponse.places || []).map((p:any)=>({
name:p.name || "",
description:p.description || ""
}))


/* FINAL RESPONSE */

return{

route:route,

transport:normalizedTransport,

crowd_prediction:normalizedCrowd,

hotels:hotels,

places:places

}

}catch(error){

console.error("AI planner error:",error)

return{
route:[],
transport:[],
crowd_prediction:{
bus:"Medium",
train:"Medium",
tourist_spots:"Moderate"
},
hotels:[],
places:[]
}

}

}