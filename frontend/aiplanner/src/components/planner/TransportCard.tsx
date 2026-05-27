import { Bus } from "lucide-react"
import type { Transport } from "../../types/trip"

export default function TransportCard({ transport }: { transport: Transport }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-700">
          <Bus size={20} />
        </div>
        <div>
          <h3 className="font-black text-slate-950">{transport.type}</h3>
          <p className="mt-1 text-sm text-slate-600">Route: {transport.route}</p>
          {transport.booking_tip && <p className="mt-2 text-sm leading-6 text-slate-600">{transport.booking_tip}</p>}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-black">
            <span className="rounded-full bg-white px-3 py-1 text-emerald-700">Rs {transport.cost}</span>
            <span className="rounded-full bg-white px-3 py-1 text-slate-700">{transport.travel_time}</span>
            {transport.comfort && <span className="rounded-full bg-white px-3 py-1 text-cyan-700">{transport.comfort} comfort</span>}
            {transport.best_for && <span className="rounded-full bg-white px-3 py-1 text-slate-700">{transport.best_for}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
