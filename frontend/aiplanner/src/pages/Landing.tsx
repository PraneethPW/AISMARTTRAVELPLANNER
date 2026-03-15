import Navbar from "../components/layout/Navbar"
import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import Testimonials from "../components/landing/Testimonials"
import HowItWorks from "../components/landing/HowItWorks"

export default function Landing(){

return(

<div className="relative min-h-screen bg-black text-white overflow-hidden">

{/* gradient glow */}

<div className="absolute inset-0 -z-10">

<div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-orange-500 rounded-full blur-[150px] opacity-40"></div>

<div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[150px] opacity-30"></div>

</div>

<Navbar/>

<Hero/>

<Features/>

<HowItWorks/>

<Testimonials/>

</div>

)

}