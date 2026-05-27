import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"
import Logo from "../components/brand/Logo"
import { registerUser } from "../api/authApi"

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    try {
      setLoading(true)
      const res = await registerUser({ name, email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (error) {
      console.error("Register error:", error)
    }

    setLoading(false)
  }

  return (
    <div className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1fr_0.9fr]">
      <section className="hidden bg-[radial-gradient(circle_at_26%_24%,rgba(52,211,153,0.2),transparent_34%),radial-gradient(circle_at_78%_54%,rgba(34,211,238,0.18),transparent_34%)] p-10 lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Start planning</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">Build trips with AI, maps, stays, food, and transport.</h1>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="text-3xl font-black">Create account</h2>
          <p className="mt-2 text-sm text-slate-400">Set up your AI travel workspace.</p>

          <div className="mt-7 space-y-4">
            <input placeholder="Full name" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm font-semibold outline-none focus:border-cyan-300" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm font-semibold outline-none focus:border-cyan-300" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm font-semibold outline-none focus:border-cyan-300" onChange={(e) => setPassword(e.target.value)} />
            <button
              onClick={handleRegister}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 text-sm font-black text-slate-950 transition hover:bg-white"
            >
              <UserPlus size={18} /> {loading ? "Creating account..." : "Register"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-black text-cyan-200">
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
