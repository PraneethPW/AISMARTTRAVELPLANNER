import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { RoutePoint } from "../../types/trip"

const DefaultIcon = L.icon({
  iconUrl: import.meta.env.VITE_LEAFLET_MARKER_ICON_URL,
  iconRetinaUrl: import.meta.env.VITE_LEAFLET_MARKER_ICON_RETINA_URL,
  shadowUrl: import.meta.env.VITE_LEAFLET_MARKER_SHADOW_URL,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (!positions || positions.length === 0) return

    const valid = positions.filter(([lat, lng]) => lat !== 0 && lng !== 0)

    if (valid.length > 0) {
      map.fitBounds(valid, { padding: [30, 30] })
    }
  }, [positions, map])

  return null
}

export default function RouteMap({ route }: { route: RoutePoint[] }) {
  if (!route || route.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center bg-slate-100">
        <p className="text-sm font-bold text-slate-500">Generate a trip to load the route map</p>
      </div>
    )
  }

  const positions = route.map((point) => [Number(point.lat) || 0, Number(point.lng) || 0]) as [number, number][]
  const center: [number, number] = positions[0][0] === 0 ? [20, 77] : positions[0]

  return (
    <MapContainer center={center} zoom={5} style={{ height: "420px", width: "100%" }} scrollWheelZoom>
      <TileLayer url={import.meta.env.VITE_MAP_TILE_URL} />
      <FitBounds positions={positions} />

      {route.map((point, index) => (
        <Marker key={index} position={[Number(point.lat) || 0, Number(point.lng) || 0]}>
          <Popup>
            <strong>{point.city}</strong>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={positions} color="#0891b2" weight={5} />
    </MapContainer>
  )
}
