export interface RoutePoint {
  city: string
  lat: number
  lng: number
  type?: string
  note?: string
}

export interface Transport {
  type: string
  route: string
  cost: string | number
  travel_time: string
  comfort?: string
  booking_tip?: string
  best_for?: string
}

export interface CrowdPrediction {
  bus: string
  train: string
  tourist_spots: string
}

export interface StayOption {
  name: string
  area: string
  price_per_night?: number
  monthly_estimate?: number
  why_pick: string
  best_for: string
  distance_note: string
}

export interface FoodOption {
  name: string
  area: string
  meal: string
  price_for_two: number
  must_try: string
  why_pick: string
}

export interface FamousPlace {
  name: string
  category: string
  best_time: string
  duration: string
  entry_fee: string
  why_visit: string
  nearby_food: string
}

export interface TimelineItem {
  day: number
  time: string
  title: string
  location: string
  duration: string
  cost: number
  notes: string
}

export interface BudgetBreakdown {
  category: string
  amount: number
  note: string
}

export interface MapLayer {
  name: string
  items: string[]
  use_case: string
}

export interface TripPlan {
  summary?: {
    title: string
    best_time_to_start: string
    estimated_total_cost: number
    travel_style: string
    overview: string
  }
  route: RoutePoint[]
  map_layers?: MapLayer[]
  stays?: {
    hotels: StayOption[]
    hostels: StayOption[]
    pgs: StayOption[]
  }
  food?: FoodOption[]
  famous_places?: FamousPlace[]
  transport: Transport[]
  timeline?: TimelineItem[]
  crowd_prediction: CrowdPrediction
  budget_breakdown?: BudgetBreakdown[]
  local_tips?: string[]
  packing_list?: string[]
}

export interface SavedTrip {
  id: number | string
  start_location: string
  destination: string
  budget: string | number
  days: string | number
  interests?: string
  plan?: TripPlan
  created_at?: string
}

export interface TripRequest {
  start: string
  destination: string
  budget: string
  days: string
  interests: string
}
