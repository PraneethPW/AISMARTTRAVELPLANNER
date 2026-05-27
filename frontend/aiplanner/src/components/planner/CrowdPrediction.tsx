import { UsersRound } from "lucide-react"
import type { CrowdPrediction } from "../../types/trip"

export default function CrowdPredictionCard({ crowd }: { crowd?: CrowdPrediction }) {
  if (!crowd) return null

  const rows = [
    ["Bus", crowd.bus, "text-amber-700"],
    ["Train", crowd.train, "text-rose-700"],
    ["Tourist Spots", crowd.tourist_spots, "text-emerald-700"],
  ]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-cyan-200">
          <UsersRound size={21} />
        </div>
        <h2 className="text-xl font-black">Crowd prediction</h2>
      </div>

      <div className="mt-5 space-y-3">
        {rows.map(([label, value, color]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-sm font-bold text-slate-600">{label}</span>
            <span className={`text-sm font-black ${color}`}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
