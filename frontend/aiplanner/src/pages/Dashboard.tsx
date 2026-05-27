import { useEffect, useState } from "react"
import { ArrowUpRight, CalendarDays, IndianRupee, MapPinned, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getTrips } from "../api/tripApi"
import { dashboardHighlights, quickActions } from "../data/travelData"
import type { SavedTrip } from "../types/trip"

export default function Dashboard() {
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

  const totalTrips = trips.length
  const totalBudget = trips.reduce((sum, trip) => sum + (Number(trip.budget) || 0), 0)
  const avgBudget = totalTrips > 0 ? Math.round(totalBudget / totalTrips) : 0
  const latestTrip = trips[0]
  const plan = latestTrip?.plan
  const liveStats = [
    { label: "Route stops", value: plan?.route?.length || 0 },
    { label: "Stay picks", value: (plan?.stays?.hotels?.length || 0) + (plan?.stays?.hostels?.length || 0) + (plan?.stays?.pgs?.length || 0) },
    { label: "Food picks", value: plan?.food?.length || 0 },
    { label: "Places", value: plan?.famous_places?.length || 0 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Dashboard</p>
              <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
                Plan the whole trip from one command center.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {latestTrip
                  ? `${latestTrip.start_location} to ${latestTrip.destination}. ${plan?.summary?.overview || "Your generated recommendations are ready across every feature page."}`
                  : "Enter trip details once in AI Planner. Routes, stays, food, famous places, transport, and estimated time will populate from that generated plan."}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-4">
                {liveStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-cyan-100">Latest generated trip</p>
                  <p className="mt-1 text-3xl font-black">{latestTrip ? latestTrip.destination : "None"}</p>
                </div>
                <Sparkles className="text-cyan-200" size={34} />
              </div>
              <div className="mt-6 space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.href}
                      to={action.href}
                      className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-950"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={18} /> {action.label}
                      </span>
                      <ArrowUpRight size={17} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {dashboardHighlights.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.tone} text-white`}>
                  <Icon size={23} />
                </div>
                <h2 className="mt-5 text-lg font-black">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            )
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Trip analytics</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl bg-slate-100 p-4">
                <CalendarDays className="text-cyan-600" />
                <p className="mt-3 text-3xl font-black">{totalTrips}</p>
                <p className="text-sm font-semibold text-slate-500">Saved trips</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <IndianRupee className="text-emerald-600" />
                <p className="mt-3 text-3xl font-black">Rs {totalBudget}</p>
                <p className="text-sm font-semibold text-slate-500">Total planned budget</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <MapPinned className="text-rose-600" />
                <p className="mt-3 text-3xl font-black">Rs {avgBudget}</p>
                <p className="text-sm font-semibold text-slate-500">Average trip budget</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black">Generated day timeline</h2>
              <Link to="/timeline" className="text-sm font-black text-cyan-700">
                Open
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {(plan?.timeline || []).slice(0, 6).map((item) => (
                <div key={`${item.day}-${item.time}-${item.title}`} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="w-16 shrink-0 text-sm font-black text-slate-950">D{item.day} {item.time}</div>
                  <div>
                    <p className="font-black">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.location} • {item.duration}</p>
                  </div>
                </div>
              ))}
              {!plan?.timeline?.length && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm font-bold text-slate-500">
                  No timeline yet. Generate a trip from AI Planner.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
