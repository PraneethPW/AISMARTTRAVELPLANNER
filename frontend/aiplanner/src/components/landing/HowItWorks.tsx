import { motion } from "framer-motion"
import { MapPin, Brain, Compass } from "lucide-react"

export default function HowItWorks(){

const steps = [

{
title:"Enter Your Trip",
desc:"Add start location, destination, budget and travel days.",
icon:<MapPin className="w-8 h-8 text-orange-400"/>
},

{
title:"AI Generates Plan",
desc:"Our AI analyzes routes, transport options and crowd data.",
icon:<Brain className="w-8 h-8 text-purple-400"/>
},

{
title:"Explore Your Journey",
desc:"Visualize routes on maps and discover hotels and places.",
icon:<Compass className="w-8 h-8 text-blue-400"/>
}

]

return(

<section className="py-28 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
How It Works
</h2>

<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

{steps.map((s,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
className="relative p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-xl hover:border-orange-400 transition"
>

{/* step number */}

<div className="absolute -top-4 -left-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold">
{i+1}
</div>

{/* icon */}

<div className="mb-6">
{s.icon}
</div>

<h3 className="text-xl font-semibold mb-3">
{s.title}
</h3>

<p className="text-white/70">
{s.desc}
</p>

</motion.div>

))}

</div>

</section>

)

}