import { useEffect, useState } from "react"
import { CalendarDays, MapPinned } from "lucide-react"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getTrips } from "../api/tripApi"
import type { SavedTrip } from "../types/trip"

export default function SavedTrips() {
  const [trips, setTrips] = useState<SavedTrip[]>([])

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getTrips()
        setTrips(res.data.data || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchTrips()
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Saved trips</p>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">Your planned travel library.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Revisit generated itineraries, budgets, route decisions, and destination ideas.
          </p>
        </section>

        {trips.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <MapPinned className="mx-auto text-cyan-700" size={38} />
            <h2 className="mt-4 text-xl font-black">No trips saved yet</h2>
            <p className="mt-2 text-sm text-slate-500">Generate a plan from the AI planner to start building your library.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <div key={trip.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100 text-cyan-700">
                    <MapPinned size={21} />
                  </div>
                  <h2 className="text-lg font-black">
                    {trip.start_location} to {trip.destination}
                  </h2>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Budget</p>
                    <p className="mt-1 text-xl font-black">Rs {trip.budget}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <CalendarDays className="text-cyan-700" size={19} />
                    <p className="mt-1 text-xl font-black">{trip.days} days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
