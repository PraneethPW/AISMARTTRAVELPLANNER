import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, Sparkles } from "lucide-react"
import { planTrip } from "../api/tripApi"
import DashboardLayout from "../components/layout/DashboardLayout"

const inputClass =
  "h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"

export default function Planner() {
  const navigate = useNavigate()
  const [start, setStart] = useState("")
  const [destination, setDestination] = useState("")
  const [budget, setBudget] = useState("")
  const [days, setDays] = useState("")
  const [interests, setInterests] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!start || !destination || !budget || !days) {
      setError("Enter start, destination, budget, and days.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await planTrip({ start, destination, budget, days, interests })
      navigate("/dashboard")
    } catch (err) {
      console.error("Trip planning error:", err)
      setError("AI planning failed. Check backend logs and OpenRouter key.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-5 sm:space-y-7">
        <section className="rounded-3xl bg-slate-950 p-4 text-white shadow-2xl sm:rounded-[2rem] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">AI Planner</p>
          <h1 className="mt-4 text-2xl font-black sm:text-5xl">Enter trip details.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            This is the only input screen. After generation, your map, stays, food, famous places, transport, timeline,
            and dashboard pages update from the saved AI plan.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4">
            <input value={start} placeholder="Start location" className={inputClass} onChange={(e) => setStart(e.target.value)} />
            <input value={destination} placeholder="Destination" className={inputClass} onChange={(e) => setDestination(e.target.value)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={budget} placeholder="Total budget in Rs" className={inputClass} onChange={(e) => setBudget(e.target.value)} />
              <input value={days} placeholder="Number of days" className={inputClass} onChange={(e) => setDays(e.target.value)} />
            </div>
            <textarea
              value={interests}
              placeholder="Interests and constraints: beaches, forts, temples, cafes, budget stays, family, solo, food, nightlife..."
              className="min-h-36 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white"
              onChange={(e) => setInterests(e.target.value)}
            />

            {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-black text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {loading ? "Generating real recommendations..." : "Generate AI travel plan"}
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
