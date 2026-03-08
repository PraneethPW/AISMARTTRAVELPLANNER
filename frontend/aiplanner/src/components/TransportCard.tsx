import { motion } from "framer-motion"
import { Bus } from "lucide-react"

export default function TransportCard({transport}:any){

  return(

<motion.div
 whileHover={{scale:1.05}}
 className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-lg"
>

<div className="flex items-center gap-3 mb-3">

<Bus className="text-blue-400"/>

<h3 className="text-white font-semibold text-lg">
{transport.type}
</h3>

</div>

<p className="text-gray-300">
{transport.route}
</p>

<div className="flex justify-between mt-4 text-sm text-gray-200">

<span>₹ {transport.cost}</span>

<span>{transport.travel_time}</span>

</div>

</motion.div>

  )

}