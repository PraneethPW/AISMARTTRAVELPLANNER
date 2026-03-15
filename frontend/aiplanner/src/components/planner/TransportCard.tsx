export default function TransportCard({transport}:any){

return(

<div className="bg-gray-800 p-6 rounded-xl shadow-lg">

<h3 className="text-xl font-semibold mb-2">
{transport.type}
</h3>

<p className="text-gray-300">
Route: {transport.route}
</p>

<p className="text-gray-300">
Cost: ₹{transport.cost}
</p>

<p className="text-gray-300">
Travel Time: {transport.travel_time}
</p>

</div>

)

}