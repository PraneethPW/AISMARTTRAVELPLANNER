import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

// Fix Leaflet default marker icons (broken in Vite/React)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length === 0) return
    const allZero = positions.every(([lat, lng]) => lat === 0 && lng === 0)
    if (allZero) return
    map.fitBounds(positions as [number, number][], { padding: [20, 20] })
  }, [map, positions])
  return null
}

export default function RouteMap({ route }: { route?: { city: string; lat: number; lng: number }[] }) {
  if (!route || route.length === 0) {
    return <div className="h-[300px] flex items-center justify-center rounded-lg bg-gray-800/50 text-gray-400">No route available</div>
  }

  const positions: [number, number][] = route.map((p) => [Number(p.lat) || 0, Number(p.lng) || 0])
  const allZero = positions.every(([lat, lng]) => lat === 0 && lng === 0)
  const center: [number, number] = allZero ? [20, 77] : positions[0]
  const zoom = allZero ? 4 : 6

  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      <MapContainer center={center} zoom={zoom} style={{ height: "450px", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {!allZero && <FitBounds positions={positions} />}
        {route.map((point, i) => (
          <Marker key={i} position={[Number(point.lat) || 0, Number(point.lng) || 0]}>
            <Popup>{point.city || `Stop ${i + 1}`}</Popup>
          </Marker>
        ))}
        {!allZero && <Polyline positions={positions} color="blue" />}
      </MapContainer>
      {allZero && (
        <p className="text-gray-400 text-sm p-2 bg-gray-800/50">Route: {route.map((p) => p.city).join(" → ")} (coordinates not provided)</p>
      )}
    </div>
  )
}