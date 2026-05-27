import { useState } from "react"
import { Link } from "react-router-dom"
import { LogIn } from "lucide-react"
import Logo from "../components/brand/Logo"
import { loginUser } from "../api/authApi"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await loginUser({ email, password })
    localStorage.setItem("token", res.data.token)
    window.location.href = "/dashboard"
  }

  return (
    <div className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1fr_0.9fr]">
      <section className="hidden bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.24),transparent_36%),radial-gradient(circle_at_74%_60%,rgba(251,191,36,0.18),transparent_32%)] p-10 lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Welcome back</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">Continue planning smarter trips.</h1>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="text-3xl font-black">Login</h2>
          <p className="mt-2 text-sm text-slate-400">Access your AI travel dashboard.</p>

          <div className="mt-7 space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm font-semibold outline-none focus:border-cyan-300"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm font-semibold outline-none focus:border-cyan-300"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 text-sm font-black text-slate-950 transition hover:bg-white"
            >
              <LogIn size={18} /> Login
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-slate-400">
            New here?{" "}
            <Link to="/register" className="font-black text-cyan-200">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
