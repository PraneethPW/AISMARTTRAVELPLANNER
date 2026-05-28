import { Compass } from "lucide-react"
import { Link } from "react-router-dom"

type LogoProps = {
  compact?: boolean
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-cyan-300 shadow-[0_0_32px_rgba(34,211,238,0.35)] ring-1 ring-white/10 sm:h-11 sm:w-11">
        <Compass size={22} />
      </span>
      {!compact && (
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-base font-black tracking-tight text-white sm:text-lg">AISMART</span>
          <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80 sm:text-xs sm:tracking-[0.24em]">
            Travel Planner
          </span>
        </span>
      )}
    </Link>
  )
}
