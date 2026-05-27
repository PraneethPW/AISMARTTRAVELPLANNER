import {
  BedDouble,
  Bus,
  Clock3,
  Compass,
  Hotel,
  Landmark,
  MapPinned,
  Plane,
  Route,
  Sparkles,
  Train,
  Utensils,
} from "lucide-react"

export const stats = [
  { label: "Trips generated", value: "18K+", detail: "AI itineraries planned" },
  { label: "Avg. savings", value: "22%", detail: "on routes and stays" },
  { label: "Cities indexed", value: "140+", detail: "India-first travel data" },
  { label: "Planner rating", value: "4.8/5", detail: "from early users" },
]

export const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Solo backpacker",
    quote:
      "The planner gave me hostel options, late-night food spots, and the cleanest train route in one flow. It felt like a travel ops dashboard.",
  },
  {
    name: "Diya Rao",
    role: "Product designer",
    quote:
      "I used it for Jaipur and Udaipur. The famous places, food list, and time estimates were way better than my messy notes.",
  },
  {
    name: "Kabir Sethi",
    role: "Founder",
    quote:
      "The dashboard makes budgets, stays, transport, and places easy to compare. This finally looks like a serious startup product.",
  },
]

export const dashboardHighlights = [
  {
    title: "AI command center",
    description: "Build complete city plans with stays, food, routes, famous places, transport, and time estimates.",
    icon: Sparkles,
    tone: "from-cyan-500 to-emerald-400",
  },
  {
    title: "Route intelligence",
    description: "Compare local maps, transport time, crowd windows, and trip order before leaving the hotel.",
    icon: Route,
    tone: "from-amber-400 to-rose-500",
  },
  {
    title: "Stay finder",
    description: "Separate hotel, hostel, and PG views with budget bands, safety cues, and area suggestions.",
    icon: Hotel,
    tone: "from-indigo-500 to-sky-400",
  },
]

export const quickActions = [
  { label: "Create itinerary", href: "/planner", icon: Sparkles },
  { label: "Explore map", href: "/map", icon: MapPinned },
  { label: "Compare stays", href: "/stays", icon: BedDouble },
  { label: "Plan transport", href: "/transport", icon: Bus },
]

export const featurePages = {
  map: {
    title: "Smart Map",
    eyebrow: "Route Layer",
    description:
      "Visualize your trip with zones for stays, famous places, food lanes, pickup points, and travel-time clusters.",
    icon: MapPinned,
    heroMetric: "8 live layers",
    cards: [
      ["Neighborhood fit", "Compare safe, central, budget, nightlife, and quiet stay areas."],
      ["Route ordering", "Arrange places by distance, opening hours, and crowd windows."],
      ["Pickup logic", "Mark bus stands, railway stations, airports, metro stops, and hotel pickup points."],
      ["Local radius", "See what is walkable in 15, 30, and 45 minute bands."],
    ],
  },
  stays: {
    title: "Hotels, Hostels & PG",
    eyebrow: "Stay Desk",
    description:
      "Split lodging choices by traveller type: premium hotels, budget hotels, social hostels, long-stay PGs, and family stays.",
    icon: BedDouble,
    heroMetric: "5 stay modes",
    cards: [
      ["Hotels", "Shortlist premium, mid-range, and budget hotels near your trip anchors."],
      ["Hostels", "Find social stays with common areas, luggage rooms, and late check-in."],
      ["PG stays", "Useful for students, interns, and long work trips needing monthly estimates."],
      ["Safety view", "Area fit, commute time, late-night access, and review quality cues."],
    ],
  },
  food: {
    title: "Food Planner",
    eyebrow: "Taste Map",
    description:
      "Plan breakfast, local food, street food, cafes, dinner, and emergency late-night options around the itinerary.",
    icon: Utensils,
    heroMetric: "6 meal slots",
    cards: [
      ["Local specials", "Surface dishes and restaurants that match the destination."],
      ["Budget meals", "Keep daily food spend realistic without killing the experience."],
      ["Diet filters", "Vegetarian, Jain, halal, high-protein, cafe-work, and family options."],
      ["Time-aware picks", "Food suggestions around your route instead of random city lists."],
    ],
  },
  places: {
    title: "Famous Places",
    eyebrow: "Discovery",
    description:
      "Turn famous places, hidden gems, photo spots, markets, museums, beaches, forts, and temples into a clean day plan.",
    icon: Landmark,
    heroMetric: "12 categories",
    cards: [
      ["Must visits", "Rank iconic locations by trip duration and traveller interest."],
      ["Hidden gems", "Add quieter places that pair naturally with popular landmarks."],
      ["Photo windows", "Suggest sunrise, sunset, and low-crowd timing."],
      ["Ticket notes", "Keep entry fee, booking, closure day, and duration estimates visible."],
    ],
  },
  transport: {
    title: "Bus, Train & Flight",
    eyebrow: "Transport Ops",
    description:
      "Compare buses, trains, flights, metro, cab, rentals, and walking segments by price, comfort, and estimated time.",
    icon: Plane,
    heroMetric: "7 modes",
    cards: [
      ["Flight planner", "Airport transfer, baggage buffer, and best arrival window."],
      ["Train planner", "Station access, sleeper preference, and local onward route."],
      ["Bus planner", "Pickup point, overnight comfort, and last-mile estimate."],
      ["Local movement", "Cab, metro, rental scooter, walking, and day-pass suggestions."],
    ],
  },
  timeline: {
    title: "Estimated Time",
    eyebrow: "Trip Clock",
    description:
      "Break the journey into realistic travel blocks, buffer time, check-in windows, food stops, and sightseeing duration.",
    icon: Clock3,
    heroMetric: "24h view",
    cards: [
      ["Daily schedule", "Morning, afternoon, evening, and night blocks with buffer time."],
      ["Travel estimates", "Door-to-door time, station time, wait time, and rest windows."],
      ["Crowd timing", "Avoid peak slots for famous places and transport hubs."],
      ["Budget clock", "See where time savings are worth spending more."],
    ],
  },
}

export const transportModes = [
  { name: "Flight", icon: Plane, time: "Fastest", note: "Best for long routes and business trips" },
  { name: "Train", icon: Train, time: "Balanced", note: "Good comfort, cost, and city access" },
  { name: "Bus", icon: Bus, time: "Budget", note: "Strong for overnight and short regional routes" },
  { name: "Local", icon: Compass, time: "Flexible", note: "Metro, cab, rental, and walking segments" },
]

export const sampleTimeline = [
  ["07:30", "Breakfast near stay", "Low travel risk"],
  ["09:00", "First famous place", "Best light and lower crowd"],
  ["12:30", "Local food stop", "Near route midpoint"],
  ["15:00", "Market or museum", "Indoor backup available"],
  ["18:00", "Sunset point", "Photo window"],
  ["20:30", "Dinner and return", "Cab or metro suggested"],
]
