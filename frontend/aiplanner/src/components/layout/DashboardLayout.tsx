import { LayoutDashboard, Map, Bookmark } from "lucide-react"
import { Link } from "react-router-dom"

type SidebarProps = {
  closeSidebar?: () => void
}

export default function Sidebar({ closeSidebar }: SidebarProps) {

return(

<div className="w-64 h-screen bg-black text-white p-6 border-r border-white/10">

{/* Logo */}

<h1 className="text-2xl font-bold mb-10">
TravelAI
</h1>


{/* Navigation */}

<nav className="space-y-6">

<Link
to="/dashboard"
onClick={closeSidebar}
className="flex items-center gap-3 text-gray-300 hover:text-white transition"
>

<LayoutDashboard size={20} />

Dashboard

</Link>


<Link
to="/planner"
onClick={closeSidebar}
className="flex items-center gap-3 text-gray-300 hover:text-white transition"
>

<Map size={20} />

Planner

</Link>


<Link
to="/saved-trips"
onClick={closeSidebar}
className="flex items-center gap-3 text-gray-300 hover:text-white transition"
>

<Bookmark size={20} />

Saved Trips

</Link>


</nav>

</div>

)

}