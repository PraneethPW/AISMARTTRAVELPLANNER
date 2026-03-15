import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Hero(){

return(

<div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">

{/* background gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

{/* glow effects */}
<div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
<div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

{/* content */}
<div className="relative z-10 max-w-4xl px-6">

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="text-5xl md:text-6xl font-bold leading-tight"
>
AI Smart Travel Planner
</motion.h1>

<motion.p
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="mt-6 text-lg text-gray-300"
>
Plan smarter trips with AI powered route optimization, crowd prediction and intelligent travel insights.
</motion.p>

{/* CTA */}
<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.4}}
className="mt-10 flex gap-4 justify-center"
>

<Link
to="/planner"
className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition"
>
Start Planning
</Link>

<Link
to="/login"
className="px-8 py-4 border border-gray-600 rounded-xl hover:bg-white/10 transition"
>
Try Demo
</Link>

</motion.div>

{/* feature cards */}
<div className="grid md:grid-cols-3 gap-6 mt-20">

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10">
<h3 className="text-lg font-semibold">AI Route Optimization</h3>
<p className="text-gray-400 text-sm mt-2">
Smart travel routes generated using AI and geographic data.
</p>
</div>

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10">
<h3 className="text-lg font-semibold">Crowd Prediction</h3>
<p className="text-gray-400 text-sm mt-2">
Predict crowd levels at tourist spots before you visit.
</p>
</div>

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10">
<h3 className="text-lg font-semibold">Transport Suggestions</h3>
<p className="text-gray-400 text-sm mt-2">
AI recommends flights, trains and buses based on budget.
</p>
</div>

</div>

</div>

</div>

)

}