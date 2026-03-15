import { motion } from "framer-motion"

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

{/* Title */}

<motion.h1
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="text-5xl md:text-6xl font-bold leading-tight"
>
AI Smart Travel Planner
</motion.h1>

{/* Subtitle */}

<motion.p
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="mt-6 text-lg text-gray-300"
>
Plan smarter trips with AI powered route optimization, crowd prediction and intelligent travel insights.
</motion.p>


{/* Feature badges replacing buttons */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.4}}
className="mt-12 flex flex-wrap justify-center gap-4"
>

<div className="px-5 py-2 bg-white/10 backdrop-blur border border-white/10 rounded-full text-sm text-gray-300">
AI Route Optimization
</div>

<div className="px-5 py-2 bg-white/10 backdrop-blur border border-white/10 rounded-full text-sm text-gray-300">
Live Crowd Prediction
</div>

<div className="px-5 py-2 bg-white/10 backdrop-blur border border-white/10 rounded-full text-sm text-gray-300">
Smart Budget Planning
</div>

<div className="px-5 py-2 bg-white/10 backdrop-blur border border-white/10 rounded-full text-sm text-gray-300">
Transport Recommendations
</div>

</motion.div>


{/* Stats Section */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.6}}
className="flex justify-center gap-12 mt-12 text-gray-400"
>

<div>
<p className="text-2xl font-bold text-white">
10K+
</p>
<p className="text-sm">
Trips Planned
</p>
</div>

<div>
<p className="text-2xl font-bold text-white">
95%
</p>
<p className="text-sm">
Route Accuracy
</p>
</div>

<div>
<p className="text-2xl font-bold text-white">
50+
</p>
<p className="text-sm">
Cities Supported
</p>
</div>

</motion.div>


{/* Feature cards */}

<div className="grid md:grid-cols-3 gap-6 mt-20">

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:border-orange-400 transition">

<h3 className="text-lg font-semibold">
AI Route Optimization
</h3>

<p className="text-gray-400 text-sm mt-2">
Smart travel routes generated using AI and geographic data.
</p>

</div>

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:border-purple-400 transition">

<h3 className="text-lg font-semibold">
Crowd Prediction
</h3>

<p className="text-gray-400 text-sm mt-2">
Predict crowd levels at tourist spots before you visit.
</p>

</div>

<div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/10 hover:border-blue-400 transition">

<h3 className="text-lg font-semibold">
Transport Suggestions
</h3>

<p className="text-gray-400 text-sm mt-2">
AI recommends flights, trains and buses based on budget.
</p>

</div>

</div>

</div>

</div>

)

}