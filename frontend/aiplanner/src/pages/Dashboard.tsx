import { useEffect,useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getTrips } from "../api/tripApi"

export default function Dashboard(){

const [trips,setTrips]=useState<any[]>([])

useEffect(()=>{

const fetchTrips = async()=>{

try{

const res = await getTrips()

setTrips(res.data.data || [])

}catch(err){
console.error(err)
}

}

fetchTrips()

},[])

/* -------- ANALYTICS -------- */

const totalTrips = trips.length

const totalBudget = trips.reduce(
(sum,t)=>sum+(Number(t.budget)||0),
0
)

const avgBudget =
totalTrips>0 ? Math.round(totalBudget/totalTrips) : 0


/* -------- TOP DESTINATION -------- */

const destinationCount:any = {}

trips.forEach((trip:any)=>{
destinationCount[trip.destination] =
(destinationCount[trip.destination]||0)+1
})

let topDestination=""

if(trips.length>0){

topDestination = Object.keys(destinationCount).reduce(
(a,b)=>destinationCount[a]>destinationCount[b]?a:b
)

}

/* -------- UI -------- */

return(

<DashboardLayout>

<h1 className="text-3xl font-bold mb-8">
Travel Dashboard
</h1>


{/* STAT CARDS */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">

<h2 className="text-gray-400 text-sm">
Total Trips
</h2>

<p className="text-3xl font-bold mt-2">
{totalTrips}
</p>

</div>


<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">

<h2 className="text-gray-400 text-sm">
Total Budget
</h2>

<p className="text-3xl font-bold mt-2">
₹{totalBudget}
</p>

</div>


<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">

<h2 className="text-gray-400 text-sm">
Average Budget
</h2>

<p className="text-3xl font-bold mt-2">
₹{avgBudget}
</p>

</div>


<div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10">

<h2 className="text-gray-400 text-sm">
Top Destination
</h2>

<p className="text-2xl font-semibold mt-2">
{topDestination || "None"}
</p>

</div>

</div>


{/* RECENT TRIPS */}

<h2 className="text-xl font-semibold mb-4">
Recent Trips
</h2>

{trips.length===0 ? (

<p className="text-gray-400">
No trips planned yet.
</p>

):( 

<div className="grid md:grid-cols-3 gap-6">

{trips.slice(0,6).map((trip:any)=>(

<div
key={trip.id}
className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10"
>

<h3 className="text-lg font-semibold">
{trip.start_location} → {trip.destination}
</h3>

<p className="text-gray-400 mt-2">
Budget: ₹{trip.budget}
</p>

<p className="text-gray-400">
Days: {trip.days}
</p>

</div>

))}

</div>

)}

</DashboardLayout>

)

}