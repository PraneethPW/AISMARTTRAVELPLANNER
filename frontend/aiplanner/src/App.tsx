import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import FeaturePage from "./pages/FeaturePage"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Planner from "./pages/Planner"
import Register from "./pages/Register"
import SavedTrips from "./pages/SavedTrips"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/map" element={<FeaturePage type="map" />} />
        <Route path="/stays" element={<FeaturePage type="stays" />} />
        <Route path="/food" element={<FeaturePage type="food" />} />
        <Route path="/places" element={<FeaturePage type="places" />} />
        <Route path="/transport" element={<FeaturePage type="transport" />} />
        <Route path="/timeline" element={<FeaturePage type="timeline" />} />
        <Route path="/trips" element={<SavedTrips />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
