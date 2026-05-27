import { Compass } from "lucide-react"
import { Link } from "react-router-dom"

type LogoProps = {
  compact?: boolean
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-cyan-300 shadow-[0_0_32px_rgba(34,211,238,0.35)] ring-1 ring-white/10">
        <Compass size={24} />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-lg font-black tracking-tight text-white">AISMART</span>
          <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Travel Planner
          </span>
        </span>
      )}
    </Link>
  )
}
