export default function CrowdPredictionCard({crowd}:any){

if(!crowd) return null

return(

<div className="bg-gray-800 p-6 rounded-xl shadow-lg">

<h2 className="text-xl font-semibold mb-4">
Crowd Prediction
</h2>

<div className="space-y-2">

<p>
Bus: 
<span className="ml-2 text-yellow-400 font-semibold">
{crowd.bus}
</span>
</p>

<p>
Train: 
<span className="ml-2 text-red-400 font-semibold">
{crowd.train}
</span>
</p>

<p>
Tourist Spots: 
<span className="ml-2 text-green-400 font-semibold">
{crowd.tourist_spots}
</span>
</p>

</div>

</div>

)

}