import { useState } from "react"
import { registerUser } from "../api/authApi"
import { Link, useNavigate } from "react-router-dom"

export default function Register(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const handleRegister = async () => {

  try{

    setLoading(true)

    const res = await registerUser({
      name,
      email,
      password
    })

    localStorage.setItem("token", res.data.token)

    navigate("/dashboard")

  }catch(error){

    console.error("Register error:", error)

  }

  setLoading(false)

}

return(

<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">

<div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-10 w-[400px]">

<h2 className="text-2xl font-bold text-white mb-6 text-center">
Create Account
</h2>

<input
placeholder="Full Name"
className="w-full mb-4 p-3 rounded bg-black/40 border border-gray-600 text-white"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Email"
className="w-full mb-4 p-3 rounded bg-black/40 border border-gray-600 text-white"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full mb-6 p-3 rounded bg-black/40 border border-gray-600 text-white"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleRegister}
className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
>

{loading ? "Creating Account..." : "Register"}

</button>

<p className="text-gray-400 text-sm mt-4 text-center">

Already have an account?{" "}

<Link to="/login" className="text-blue-400">
Login
</Link>

</p>

</div>

</div>

)

}