import { useEffect } from "react"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { RoutePoint } from "../../types/trip"

const markerIconUrl =
  import.meta.env.VITE_LEAFLET_MARKER_ICON_URL || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
const markerIconRetinaUrl =
  import.meta.env.VITE_LEAFLET_MARKER_ICON_RETINA_URL || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png"
const markerShadowUrl =
  import.meta.env.VITE_LEAFLET_MARKER_SHADOW_URL || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
const mapTileUrl =
  import.meta.env.VITE_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const DefaultIcon = L.icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIconRetinaUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const isValidCoordinate = (lat: number, lng: number) => {
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (!positions || positions.length === 0) return

    const valid = positions.filter(([lat, lng]) => isValidCoordinate(lat, lng))

    if (valid.length > 0) {
      map.fitBounds(valid, { padding: [30, 30] })
    }
  }, [positions, map])

  return null
}

export default function RouteMap({ route }: { route: RoutePoint[] }) {
  const safeRoute = Array.isArray(route) ? route : []
  const validRoute = safeRoute
    .map((point) => ({
      ...point,
      lat: Number(point.lat),
      lng: Number(point.lng),
    }))
    .filter((point) => isValidCoordinate(point.lat, point.lng))

  if (validRoute.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center bg-slate-100">
        <p className="text-sm font-bold text-slate-500">Generate a trip to load the route map</p>
      </div>
    )
  }

  const positions = validRoute.map((point) => [point.lat, point.lng]) as [number, number][]
  const center: [number, number] = positions[0] || [20, 77]

  return (
    <MapContainer key={positions.map(([lat, lng]) => `${lat},${lng}`).join("|")} center={center} zoom={5} style={{ height: "420px", width: "100%" }} scrollWheelZoom>
      <TileLayer url={mapTileUrl} />
      <FitBounds positions={positions} />

      {validRoute.map((point, index) => (
        <Marker key={`${point.city}-${index}`} position={[point.lat, point.lng]}>
          <Popup>
            <strong>{point.city}</strong>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={positions} color="#0891b2" weight={5} />
    </MapContainer>
  )
}
