import type { ReactNode } from "react"

export default function GlassCard({ children }: { children: ReactNode }) {

    return (
  
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg">
  
  {children}
  
  </div>
  
    )
  
  }
