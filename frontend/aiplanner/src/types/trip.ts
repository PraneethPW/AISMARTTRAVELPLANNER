export interface RoutePoint {
    city: string;
    lat: number;
    lng: number;
  }
  
  export interface Transport {
    type: string;
    route: string;
    cost: string;
    travel_time: string;
  }
  
  export interface CrowdPrediction {
    bus: string;
    train: string;
    tourist_spots: string;
  }
  
  export interface Hotel {
    name: string;
    price_per_night: string;
    location: string;
  }
  
  export interface Place {
    name: string;
    description: string;
  }
  
  export interface TripPlan {
    route: RoutePoint[];
    transport: Transport[];
    crowd_prediction: CrowdPrediction;
    hotels: Hotel[];
    places: Place[];
  }