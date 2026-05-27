import API from "./api"
import type { TripRequest } from "../types/trip"

export const planTrip = (data: TripRequest)=>{
  return API.post("/trip/plan",data)
}

export const getTrips = ()=>{
  return API.get("/trip/my-trips")
}
