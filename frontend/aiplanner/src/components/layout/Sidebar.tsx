import { Link } from "react-router-dom"
import { LayoutDashboard, Route, Bookmark } from "lucide-react"

export default function Sidebar(){

return(

<div className="w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 p-6">

<h1 className="text-xl font-bold mb-10 text-white">
TravelAI
</h1>

<nav className="flex flex-col gap-5 text-gray-300">

<Link to="/dashboard" className="flex items-center gap-2">
<LayoutDashboard size={18}/> Dashboard
</Link>

<Link to="/planner" className="flex items-center gap-2">
<Route size={18}/> Planner
</Link>

<Link to="/trips" className="flex items-center gap-2">
<Bookmark size={18}/> Saved Trips
</Link>

</nav>

</div>

)

}