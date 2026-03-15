import API from "./api"

export const planTrip = (data:any)=>{
  return API.post("/trip/plan",data)
}

export const getTrips = ()=>{
  return API.get("/trip/my-trips")
}