import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Hero from "../components/landing/Hero"
import { dashboardHighlights, featurePages, testimonials } from "../data/travelData"

export default function Landing() {
  const pages = Object.entries(featurePages)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <Hero />

      <section id="features" className="bg-slate-900 px-3 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Startup-grade platform</p>
            <h2 className="mt-4 break-words text-2xl font-black tracking-tight sm:text-5xl">
              Every major travel need is now its own focused page.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardHighlights.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:rounded-[2rem] sm:p-6">
                  <div className={`mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${feature.tone}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="break-words text-xl font-black">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map(([key, page]) => {
              const Icon = page.icon
              return (
                <Link
                  key={key}
                  to={`/${key}`}
                  className="group min-w-0 rounded-3xl border border-white/10 bg-slate-950/55 p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-slate-950"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/12 text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <ArrowRight className="text-slate-500 transition group-hover:text-cyan-200" size={20} />
                  </div>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-cyan-200/80">{page.eyebrow}</p>
                  <h3 className="mt-2 break-words text-xl font-black">{page.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{page.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section id="reviews" className="border-y border-white/10 bg-slate-950 px-3 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">Testimonials</p>
              <h2 className="mt-4 break-words text-2xl font-black sm:text-5xl">Built for travellers who need clarity fast.</h2>
            </div>
            <Link to="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 sm:w-auto">
              Create account <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
                <blockquote className="text-sm leading-7 text-slate-200">"{item.quote}"</blockquote>
                <figcaption className="mt-6">
                  <p className="font-black">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
