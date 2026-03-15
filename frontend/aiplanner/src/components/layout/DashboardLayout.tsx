import { useState } from "react"
import Sidebar from "./Sidebar"
import { Menu } from "lucide-react"

export default function DashboardLayout({ children }: any) {

const [open, setOpen] = useState(false)

return (

<div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

{/* MOBILE TOP BAR */}

<div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur border-b border-white/10">

<button onClick={() => setOpen(true)}>
<Menu size={26}/>
</button>

<h1 className="font-semibold text-lg">
TravelAI
</h1>

</div>


{/* DESKTOP SIDEBAR */}

<div className="hidden md:block">
<Sidebar />
</div>


{/* MOBILE SIDEBAR */}

{open && (

<div className="fixed inset-0 z-40 flex">

{/* Sidebar */}

<div className="w-64 bg-black border-r border-white/10">

<Sidebar closeSidebar={() => setOpen(false)} />

</div>

{/* Overlay */}

<div
className="flex-1 bg-black/60"
onClick={() => setOpen(false)}
></div>

</div>

)}


{/* MAIN CONTENT */}

<div className="flex-1 p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto">

{children}

</div>

</div>

)

}