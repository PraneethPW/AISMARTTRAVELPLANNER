import {
  BedDouble,
  Clock3,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Plane,
  Route,
  Sparkles,
  Utensils,
  Landmark,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import Logo from "../brand/Logo"

type SidebarProps = {
  closeSidebar?: () => void
}

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "AI Planner", to: "/planner", icon: Sparkles },
  { label: "Map", to: "/map", icon: MapPinned },
  { label: "Hotels & PG", to: "/stays", icon: BedDouble },
  { label: "Food", to: "/food", icon: Utensils },
  { label: "Famous Places", to: "/places", icon: Landmark },
  { label: "Bus Train Flight", to: "/transport", icon: Plane },
  { label: "Estimated Time", to: "/timeline", icon: Clock3 },
  { label: "Saved Trips", to: "/trips", icon: Route },
]

export default function Sidebar({ closeSidebar }: SidebarProps) {
  return (
    <aside className="flex h-screen w-[min(18rem,86vw)] shrink-0 flex-col overflow-y-auto border-r border-slate-800 bg-slate-950 px-3 py-4 text-white sm:px-4 sm:py-5 lg:w-72">
      <div className="min-w-0 px-2">
        <Logo />
      </div>

      <nav className="mt-6 space-y-1 sm:mt-8">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex min-w-0 items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition sm:px-4 ${
                  isActive
                    ? "bg-cyan-300 text-slate-950 shadow-[0_0_26px_rgba(103,232,249,0.24)]"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span className="truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/"
        }}
        className="mt-auto flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/8 hover:text-white sm:px-4"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  )
}
