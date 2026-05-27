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
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 px-4 py-5 text-white">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-cyan-300 text-slate-950 shadow-[0_0_26px_rgba(103,232,249,0.24)]"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/"
        }}
        className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/8 hover:text-white"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  )
}
