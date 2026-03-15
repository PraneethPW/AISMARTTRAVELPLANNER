import { motion } from "framer-motion"

export default function Hero(){

return(

<section className="text-center py-36 px-6">

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-6xl font-bold mb-6 tracking-tight"
>

AI Smart Travel Planner

</motion.h1>

<p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">

Plan smarter trips with AI powered route optimization,
crowd prediction and travel insights.

</p>

<a
href="/planner"
className="px-10 py-4 rounded-xl
bg-gradient-to-r
from-orange-500
to-pink-500
text-white
font-semibold
shadow-lg
hover:scale-105
transition"
>

Start Planning

</a>

</section>

)

}