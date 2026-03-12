import { useState } from "react"
import API from "../api/api"

import Navbar from "../components/Navbar"
import RouteMap from "../components/RouteMap"
import TransportCard from "../components/TransportCard"
import CrowdPrediction from "../components/CrowdPrediction"
import GlassCard from "../components/GlassCard"

import { motion } from "framer-motion"

export default function Planner(){

const [start,setStart] = useState("")
const [destination,setDestination] = useState("")
const [budget,setBudget] = useState("")
const [days,setDays] = useState("")
const [interests,setInterests] = useState("")

const [result,setResult] = useState<any>(null)
const [loading,setLoading] = useState(false)

const handleSubmit = async () => {

  setLoading(true)

  try{

    const res = await API.post("/trip/plan",{
      start,
      destination,
      budget,
      days,
      interests
    })

    console.log("API RESPONSE:", res.data)

    // backend already returns the plan inside data
    setResult(res.data.data)

  }catch(error){

    console.error("Trip planning error:", error)

  }

  setLoading(false)

}
return(

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

<Navbar/>

<div className="max-w-6xl mx-auto p-10 space-y-10">

<motion.h1
 initial={{opacity:0,y:-20}}
 animate={{opacity:1,y:0}}
 className="text-4xl font-bold text-center"
>
AI Smart Travel Planner
</motion.h1>

<GlassCard>

<div className="grid grid-cols-2 gap-4">

<input
placeholder="Start Location"
className="bg-black/40 border border-gray-600 p-3 rounded"
onChange={(e)=>setStart(e.target.value)}
/>

<input
placeholder="Destination"
className="bg-black/40 border border-gray-600 p-3 rounded"
onChange={(e)=>setDestination(e.target.value)}
/>

<input
placeholder="Budget"
className="bg-black/40 border border-gray-600 p-3 rounded"
onChange={(e)=>setBudget(e.target.value)}
/>

<input
placeholder="Days"
className="bg-black/40 border border-gray-600 p-3 rounded"
onChange={(e)=>setDays(e.target.value)}
/>

</div>

<input
placeholder="Interests"
className="bg-black/40 border border-gray-600 p-3 rounded mt-4 w-full"
onChange={(e)=>setInterests(e.target.value)}
/>

<button
onClick={handleSubmit}
className="mt-5 w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
>

{loading ? "Generating Trip..." : "Generate Trip Plan"}

</button>

</GlassCard>

{result && (

<div className="space-y-10">

{/* MAP – always show when we have any route or structured data */}
{(result?.route?.length > 0 || result?.transport?.length > 0 || result?.crowd_prediction) && (
<GlassCard>
<h2 className="text-xl mb-4 font-semibold">Travel Route</h2>
<RouteMap route={result.route?.length ? result.route : [{ city: start || "Start", lat: 0, lng: 0 }, { city: destination || "Destination", lat: 0, lng: 0 }]} />
</GlassCard>
)}

{/* CROWD */}
{result?.crowd_prediction && Object.keys(result.crowd_prediction).length > 0 && (
<CrowdPrediction crowd={result.crowd_prediction} />
)}

{/* TRANSPORT */}
{result?.transport && result.transport.length > 0 && (
<div>
<h2 className="text-xl font-semibold mb-4">Transport Options</h2>
<div className="grid grid-cols-2 gap-4">
{result.transport.map((t: any, i: number) => (
<TransportCard key={i} transport={t} />
))}
</div>
</div>
)}

{/* Raw AI text only when no structured sections were shown */}
{result?.raw_response && !result?.route?.length && !result?.transport?.length && !(result?.crowd_prediction && Object.keys(result.crowd_prediction).length > 0) && (
<GlassCard>
<h2 className="text-xl mb-4 font-semibold">AI Generated Plan</h2>
<p className="text-gray-300 whitespace-pre-wrap">{result.raw_response}</p>
</GlassCard>
)}

</div>

)}

</div>

</div>

)

}