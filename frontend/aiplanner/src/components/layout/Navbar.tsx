import { Link } from "react-router-dom"
import Logo from "../brand/Logo"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#numbers" className="hover:text-white">
            Numbers
          </a>
          <a href="#reviews" className="hover:text-white">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(103,232,249,0.35)] transition hover:bg-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}
