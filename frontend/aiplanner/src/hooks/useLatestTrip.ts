import { useEffect, useState } from "react"
import { getTrips } from "../api/tripApi"
import type { SavedTrip } from "../types/trip"

export const useLatestTrip = () => {
  const [trip, setTrip] = useState<SavedTrip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadTrip = async () => {
      try {
        const response = await getTrips()
        setTrip(response.data.data?.[0] || null)
      } catch (err) {
        console.error(err)
        setError("Could not load your latest generated trip.")
      } finally {
        setLoading(false)
      }
    }

    loadTrip()
  }, [])

  return { trip, plan: trip?.plan || null, loading, error }
}
