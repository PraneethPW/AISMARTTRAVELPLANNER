import { motion } from "framer-motion"

export default function Testimonials(){

const reviews=[

{
name:"Sarah",
text:"This planner saved me hours of travel planning and gave amazing route suggestions.",
avatar:"https://i.pravatar.cc/100?img=1"
},

{
name:"Arjun",
text:"The AI route optimization is incredible. It suggested faster travel options.",
avatar:"https://i.pravatar.cc/100?img=3"
},

{
name:"David",
text:"Best travel AI I have used. The crowd prediction feature is extremely helpful.",
avatar:"https://i.pravatar.cc/100?img=5"
}

]

return(

<section className="py-24 px-6">

<h2 className="text-4xl font-bold text-center mb-16">
What Travelers Say
</h2>

<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

{reviews.map((r,i)=>(

<motion.div
key={i}
whileHover={{y:-10}}
className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-pink-400 transition"
>

<p className="text-gray-300 italic mb-6">
"{r.text}"
</p>

<div className="flex items-center gap-4">

<img
src={r.avatar}
className="w-10 h-10 rounded-full"
/>

<p className="font-semibold">
{r.name}
</p>

</div>

</motion.div>

))}

</div>

</section>

)

}