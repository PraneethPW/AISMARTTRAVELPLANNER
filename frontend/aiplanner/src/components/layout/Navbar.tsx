import { Link } from "react-router-dom"

export default function Navbar(){

return(

<div className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">

<h1 className="text-xl font-bold text-white">
TravelAI
</h1>

<div className="flex gap-6 items-center">

<Link
to="/login"
className="text-white/80 hover:text-white transition"
>
Login
</Link>

<Link
to="/register"
className="
px-5 py-2
rounded-lg
bg-gradient-to-r
from-orange-500
to-pink-500
text-white
font-medium
shadow-md
hover:scale-105
transition
"
>
Sign Up
</Link>

</div>

</div>

)

}