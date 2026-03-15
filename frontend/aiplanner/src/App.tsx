import { BrowserRouter,Routes,Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Planner from "./pages/Planner"
import SavedTrips from "./pages/SavedTrips"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Landing/>}/>

<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>

<Route path="/planner" element={<Planner/>}/>

<Route path="/trips" element={<SavedTrips/>}/>

</Routes>

</BrowserRouter>

)

}

export default App