import { useState } from "react"
import type { ReactNode } from "react"
import { Menu, Search } from "lucide-react"
import Sidebar from "./Sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <Sidebar closeSidebar={() => setOpen(false)} />
          <button aria-label="Close menu" className="flex-1 bg-slate-950/70" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:bg-white"
                placeholder="Search destination, food, stays, route..."
              />
            </div>

            <div className="hidden rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-cyan-200 sm:block">
              AI Travel Ops
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
