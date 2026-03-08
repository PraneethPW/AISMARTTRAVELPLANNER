import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function RouteMap({route}:any){

  if(!route || route.length === 0){
    return <div className="text-gray-400">No route available</div>
  }

  const positions = route.map((p:any)=>[p.lat,p.lng])

  return(

<MapContainer
 center={positions[0]}
 zoom={6}
 style={{height:"450px",width:"100%"}}
>

<TileLayer
 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{route.map((point:any,i:number)=>(
  <Marker key={i} position={[point.lat,point.lng]}>
    <Popup>{point.city}</Popup>
  </Marker>
))}

<Polyline positions={positions} color="blue"/>

</MapContainer>

  )
}