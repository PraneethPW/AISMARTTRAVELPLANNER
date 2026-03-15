import { useState } from "react";
import { loginUser } from "../api/authApi";

export default function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {

const res = await loginUser({email,password});

localStorage.setItem("token", res.data.token);

window.location.href="/dashboard";

};

return(

<div className="flex items-center justify-center min-h-screen bg-black">

<div className="bg-white/10 p-10 rounded-xl backdrop-blur w-[380px] border border-white/10">

<h2 className="text-white text-2xl mb-6 font-semibold">
Login
</h2>

<input
type="email"
placeholder="Email"
className="p-3 w-full mb-4 bg-black/40 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
style={{color:"white"}}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="p-3 w-full mb-4 bg-black/40 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
style={{color:"white"}}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
onClick={handleLogin}
className="w-full bg-blue-600 py-3 rounded text-white font-semibold hover:bg-blue-500 transition"
>

Login

</button>

</div>

</div>

)

}