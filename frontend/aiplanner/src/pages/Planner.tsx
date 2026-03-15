import { useState } from "react"
import { planTrip } from "../api/tripApi"

import DashboardLayout from "../components/layout/DashboardLayout"
import RouteMap from "../components/planner/RouteMap"
import CrowdPrediction from "../components/planner/CrowdPrediction"
import TransportCard from "../components/planner/TransportCard"
import GlassCard from "../components/ui/GlassCard"

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

const res = await planTrip({
start,
destination,
budget,
days,
interests
})

console.log("API RESPONSE:",res.data)

// backend response structure
setResult(res.data.data.plan)

}catch(error){

console.error("Trip planning error:",error)

}

setLoading(false)

}

return(

<DashboardLayout>

<div className="max-w-7xl mx-auto space-y-10">

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-3xl font-bold"
>
AI Travel Planner
</motion.h1>

{/* Planner Form */}

<GlassCard>

<div className="grid md:grid-cols-2 gap-4">

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

{loading ? "Generating AI Travel Plan..." : "Generate Trip Plan"}

</button>

</GlassCard>

{/* RESULTS */}

{result && (

<div className="grid lg:grid-cols-3 gap-8">

{/* MAP */}

<div className="lg:col-span-2">

<GlassCard>

<h2 className="text-xl mb-4 font-semibold">
Travel Route
</h2>

<RouteMap
route={
result?.route?.length
? result.route
: []
}
/>

</GlassCard>

</div>

{/* RIGHT PANEL */}

<div className="space-y-6">

{/* Crowd Prediction */}

{result?.crowd_prediction && (

<CrowdPrediction crowd={result.crowd_prediction}/>

)}

{/* Transport Recommendations */}

{result?.transport?.length > 0 && (

<div>

<h2 className="text-xl font-semibold mb-4">
Transport Options
</h2>

<div className="space-y-4">

{result.transport.map((t:any,i:number)=>(

<TransportCard
key={i}
transport={{
type:t.type,
route:t.route,
cost:t.cost,
travel_time:t.travel_time
}}
/>

))}

</div>

</div>

)}

</div>

</div>

)}

</div>

</DashboardLayout>

)

}