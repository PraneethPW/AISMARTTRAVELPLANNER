import { Map } from "lucide-react"

export default function Navbar(){

  return(

    <div className="w-full flex justify-between items-center px-10 py-5 bg-black/40 backdrop-blur-lg border-b border-white/10">

      <div className="flex items-center gap-3">

        <Map className="text-blue-400"/>

        <h1 className="text-white font-bold text-xl">
          AI Travel Planner
        </h1>

      </div>

      <div className="flex gap-6 text-gray-300">

        <span className="hover:text-white cursor-pointer">
          Planner
        </span>

        <span className="hover:text-white cursor-pointer">
          Saved Trips
        </span>

        <span className="hover:text-white cursor-pointer">
          Profile
        </span>

      </div>

    </div>

  )

}