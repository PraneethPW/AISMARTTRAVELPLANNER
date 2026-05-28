import { ArrowRight, MapPinned, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import TravelGlobe from "./TravelGlobe"
import { stats } from "../../data/travelData"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_42%,rgba(251,191,36,0.16),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-900 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-6 px-3 py-8 sm:min-h-[calc(100vh-76px)] sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 sm:mb-6 sm:px-4 sm:text-sm">
            <Sparkles size={16} />
            <span className="min-w-0 break-words">AI-powered city planning for stays, routes, food, and transport</span>
          </div>

          <h1 className="max-w-4xl break-words text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            AISMART Travel Planner
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A professional trip operating system that turns one destination into a complete plan:
            maps, hotels, hostels, PG stays, food, famous places, bus, train, flight, and realistic time estimates.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/planner"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_0_38px_rgba(103,232,249,0.32)] transition hover:bg-white sm:px-6"
            >
              Start Planning <ArrowRight size={18} />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            >
              <MapPinned size={18} /> View Dashboard
            </Link>
          </div>

          <div id="numbers" className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur sm:p-4">
                <p className="break-words text-xl font-black text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-cyan-100/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative min-w-0"
        >
          <div className="absolute inset-6 rounded-full bg-cyan-300/10 blur-3xl" />
          <TravelGlobe />
          <div className="absolute bottom-6 left-3 right-3 grid grid-cols-3 gap-2 sm:left-8 sm:right-8">
            {["Stay", "Route", "Food"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-center text-xs font-bold text-slate-100 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
