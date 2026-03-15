import { useEffect } from "react"
import L from "leaflet"

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

/* Fix leaflet default marker issue in Vite */
const DefaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

/* Fit map bounds automatically */

function FitBounds({ positions }: any) {

  const map = useMap()

  useEffect(() => {

    if (!positions || positions.length === 0) return

    const valid = positions.filter(
      ([lat, lng]: any) => lat !== 0 && lng !== 0
    )

    if (valid.length > 0) {
      map.fitBounds(valid, { padding: [30, 30] })
    }

  }, [positions])

  return null
}

export default function RouteMap({ route }: any) {

  if (!route || route.length === 0) {

    return (

      <div className="h-[450px] flex items-center justify-center bg-gray-800/40 rounded-lg">

        <p className="text-gray-400">
          No route available yet
        </p>

      </div>

    )

  }

  const positions = route.map((p: any) => [
    Number(p.lat) || 0,
    Number(p.lng) || 0
  ])

  const center =
    positions[0][0] === 0 ? [20, 77] : positions[0]

  return (

    <div className="rounded-lg overflow-hidden border border-white/10">

      <MapContainer
        center={center as any}
        zoom={5}
        style={{ height: "450px", width: "100%" }}
        scrollWheelZoom
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds positions={positions} />

        {route.map((point: any, i: number) => (

          <Marker
            key={i}
            position={[
              Number(point.lat) || 0,
              Number(point.lng) || 0
            ]}
          >

            <Popup>

              <strong>{point.city}</strong>

            </Popup>

          </Marker>

        ))}

        <Polyline
          positions={positions}
          color="blue"
          weight={4}
        />

      </MapContainer>

    </div>

  )

}