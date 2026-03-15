import { useEffect,useState } from "react"
import { getTrips } from "../api/tripApi"
import DashboardLayout from "../components/layout/DashboardLayout"

export default function SavedTrips(){

const [trips,setTrips]=useState<any[]>([])

useEffect(()=>{

const fetchTrips = async ()=>{

try{

const res = await getTrips()

// backend returns { success:true, data:[...] }
setTrips(res.data.data || [])

}catch(err){
console.error(err)
}

}

fetchTrips()

},[])

return(

<DashboardLayout>

<h1 className="text-3xl font-bold mb-6">
Saved Trips
</h1>

{trips.length===0 ? (

<p className="text-gray-400">
No trips saved yet
</p>

):(

<div className="grid md:grid-cols-3 gap-6">

{trips.map((trip:any)=>(

<div
key={trip.id}
className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/10"
>

<h2 className="text-lg font-semibold">
{trip.start_location} → {trip.destination}
</h2>

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