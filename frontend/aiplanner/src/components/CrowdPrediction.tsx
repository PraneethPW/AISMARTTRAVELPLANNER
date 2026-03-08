import { Users } from "lucide-react"

export default function CrowdPrediction({ crowd }: any) {

  const bus = crowd?.bus || "Not available"
  const train = crowd?.train || "Not available"
  const tourist = crowd?.tourist_spots || "Not available"

  return (

<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg">

<h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">

<Users className="text-purple-400"/>

Crowd Prediction

</h2>

<div className="space-y-3 text-gray-200 text-sm">

<div className="flex justify-between">
<span>Bus</span>
<span className="text-purple-300 font-medium">{bus}</span>
</div>

<div className="flex justify-between">
<span>Train</span>
<span className="text-purple-300 font-medium">{train}</span>
</div>

<div className="flex justify-between">
<span>Tourist Spots</span>
<span className="text-purple-300 font-medium">{tourist}</span>
</div>

</div>

</div>

  )

}