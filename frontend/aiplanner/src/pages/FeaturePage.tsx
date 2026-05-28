import { ArrowRight, BedDouble, Clock3, IndianRupee, MapPinned, Utensils } from "lucide-react"
import { Link } from "react-router-dom"
import DashboardLayout from "../components/layout/DashboardLayout"
import RouteMap from "../components/planner/RouteMap"
import TransportCard from "../components/planner/TransportCard"
import { featurePages } from "../data/travelData"
import { useLatestTrip } from "../hooks/useLatestTrip"
import type { FamousPlace, FoodOption, StayOption, TimelineItem, Transport } from "../types/trip"

type FeaturePageProps = {
  type: keyof typeof featurePages
}

const EmptyState = () => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-5 text-center sm:p-10">
    <MapPinned className="mx-auto text-cyan-700" size={38} />
    <h2 className="mt-4 text-xl font-black">No generated plan yet</h2>
    <p className="mt-2 text-sm text-slate-500">Enter your trip details once. These pages will fill with AI recommendations.</p>
    <Link to="/planner" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white sm:w-auto">
      Generate plan <ArrowRight size={18} />
    </Link>
  </div>
)

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="min-w-0">
    <h2 className="break-words text-lg font-black sm:text-xl">{title}</h2>
    {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
  </div>
)

const toList = <T,>(value: T[] | T | null | undefined): T[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const StayCard = ({ stay, label }: { stay: StayOption; label: string }) => (
  <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{label}</p>
        <h3 className="mt-2 break-words text-base font-black sm:text-lg">{stay.name}</h3>
      </div>
      <BedDouble className="text-cyan-700" size={22} />
    </div>
    <p className="mt-3 text-sm font-bold text-slate-600">{stay.area}</p>
    <p className="mt-3 text-sm leading-6 text-slate-600">{stay.why_pick}</p>
    <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
      <span className="rounded-full bg-slate-100 px-3 py-1">{stay.best_for}</span>
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
        {stay.monthly_estimate ? `Rs ${stay.monthly_estimate}/month` : `Rs ${stay.price_per_night}/night`}
      </span>
    </div>
    <p className="mt-3 text-xs font-semibold text-slate-500">{stay.distance_note}</p>
  </div>
)

const FoodCard = ({ food }: { food: FoodOption }) => (
  <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <Utensils className="text-cyan-700" size={22} />
    <h3 className="mt-4 break-words text-base font-black sm:text-lg">{food.name}</h3>
    <p className="mt-1 text-sm font-bold text-slate-500">{food.area} • {food.meal}</p>
    <p className="mt-3 text-sm leading-6 text-slate-600">{food.why_pick}</p>
    <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
      <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{food.must_try}</span>
      <span className="rounded-full bg-slate-100 px-3 py-1">Rs {food.price_for_two} for two</span>
    </div>
  </div>
)

const PlaceCard = ({ place }: { place: FamousPlace }) => (
  <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{place.category}</p>
    <h3 className="mt-2 break-words text-base font-black sm:text-lg">{place.name}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-600">{place.why_visit}</p>
    <div className="mt-4 grid gap-2 text-xs font-bold text-slate-600 sm:grid-cols-2">
      <span className="rounded-2xl bg-slate-100 px-3 py-2">Best: {place.best_time}</span>
      <span className="rounded-2xl bg-slate-100 px-3 py-2">Time: {place.duration}</span>
      <span className="rounded-2xl bg-slate-100 px-3 py-2">Entry: {place.entry_fee}</span>
      <span className="rounded-2xl bg-slate-100 px-3 py-2">Food: {place.nearby_food}</span>
    </div>
  </div>
)

const TimelineRow = ({ item }: { item: TimelineItem }) => (
  <div className="grid min-w-0 gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[80px_1fr_120px] sm:p-5">
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-slate-400">Day {item.day}</p>
      <p className="text-lg font-black text-cyan-700">{item.time}</p>
    </div>
    <div>
      <h3 className="break-words font-black">{item.title}</h3>
      <p className="mt-1 text-sm font-bold text-slate-500">{item.location} • {item.duration}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.notes}</p>
    </div>
    <div className="flex items-center gap-2 text-sm font-black text-emerald-700 sm:justify-end">
      <IndianRupee size={16} /> {item.cost}
    </div>
  </div>
)

export default function FeaturePage({ type }: FeaturePageProps) {
  const page = featurePages[type]
  const Icon = page.icon
  const { trip, plan, loading, error } = useLatestTrip()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl bg-white p-8 text-sm font-black text-slate-600">Loading generated trip...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-w-0 space-y-5 sm:space-y-7">
        <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl sm:rounded-[2rem]">
          <div className="grid min-w-0 gap-5 p-4 sm:gap-6 sm:p-8 lg:grid-cols-[1fr_0.65fr]">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">{page.eyebrow}</p>
              <h1 className="mt-4 break-words text-2xl font-black tracking-tight sm:text-5xl">{page.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                {trip ? `${trip.start_location} to ${trip.destination}. ${plan?.summary?.overview || page.description}` : page.description}
              </p>
            </div>
            <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-4 sm:rounded-[1.75rem] sm:p-5">
              <Icon className="text-cyan-200" size={34} />
              <p className="mt-8 text-sm font-semibold text-slate-400">Active generated trip</p>
              <p className="mt-2 break-words text-xl font-black sm:text-2xl">{trip ? trip.destination : "No plan"}</p>
              {plan?.summary?.estimated_total_cost ? (
                <p className="mt-2 text-sm text-cyan-100">Estimated total: Rs {plan.summary.estimated_total_cost}</p>
              ) : null}
            </div>
          </div>
        </section>

        {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}
        {!plan ? <EmptyState /> : null}

        {plan && type === "map" && (
          <section className="grid min-w-0 gap-4 xl:grid-cols-[1.25fr_0.75fr] xl:gap-5">
            <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <RouteMap route={toList(plan.route)} />
            </div>
            <div className="space-y-4">
              <SectionTitle title="Generated map layers" subtitle="Built from your destination and interests." />
              {toList(plan.map_layers).map((layer, index) => (
                <div key={`${layer.name || "layer"}-${index}`} className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <h3 className="break-words font-black">{layer.name || "Map layer"}</h3>
                  <p className="mt-2 text-sm text-slate-600">{layer.use_case || "Generated from your latest trip plan."}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {toList(layer.items).map((item, itemIndex) => (
                      <span key={`${item}-${itemIndex}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{String(item)}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {plan && type === "stays" && (
          <section className="space-y-6">
            <SectionTitle title="Hotels" subtitle="AI generated stay picks for this budget and destination." />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{(plan.stays?.hotels || []).map((stay) => <StayCard key={stay.name} stay={stay} label="Hotel" />)}</div>
            <SectionTitle title="Hostels" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{(plan.stays?.hostels || []).map((stay) => <StayCard key={stay.name} stay={stay} label="Hostel" />)}</div>
            <SectionTitle title="PG and long-stay options" />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{(plan.stays?.pgs || []).map((stay) => <StayCard key={stay.name} stay={stay} label="PG" />)}</div>
          </section>
        )}

        {plan && type === "food" && (
          <section>
            <SectionTitle title="Food recommendations" subtitle="Meal-aware picks based on the generated route." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{(plan.food || []).map((food) => <FoodCard key={food.name} food={food} />)}</div>
          </section>
        )}

        {plan && type === "places" && (
          <section>
            <SectionTitle title="Famous places to visit" subtitle="With timing, duration, entry fee, and nearby food." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{(plan.famous_places || []).map((place) => <PlaceCard key={place.name} place={place} />)}</div>
          </section>
        )}

        {plan && type === "transport" && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(plan.transport || []).map((transport: Transport, index) => <TransportCard key={`${transport.type}-${index}`} transport={transport} />)}
          </section>
        )}

        {plan && type === "timeline" && (
          <section className="space-y-4">
            <SectionTitle title="Estimated time planner" subtitle="Generated day-wise timing, cost, duration, and notes." />
            {(plan.timeline || []).map((item) => <TimelineRow key={`${item.day}-${item.time}-${item.title}`} item={item} />)}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-3">
                <Clock3 className="text-cyan-700" />
                <h3 className="font-black">Crowd prediction</h3>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <p className="rounded-2xl bg-slate-100 p-4 text-sm font-bold">Bus: {plan.crowd_prediction.bus}</p>
                <p className="rounded-2xl bg-slate-100 p-4 text-sm font-bold">Train: {plan.crowd_prediction.train}</p>
                <p className="rounded-2xl bg-slate-100 p-4 text-sm font-bold">Tourist spots: {plan.crowd_prediction.tourist_spots}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  )
}
