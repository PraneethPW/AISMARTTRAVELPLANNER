export default function Testimonials(){

    const reviews=[
    
    {name:"Sarah",text:"This planner saved me hours"},
    {name:"Arjun",text:"The route optimization is amazing"},
    {name:"David",text:"Best travel AI I have used"}
    
    ]
    
    return(
    
    <section className="py-20">
    
    <h2 className="text-3xl text-center mb-10">
    Testimonials
    </h2>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    
    {reviews.map((r,i)=>(
    <div key={i} className="bg-white/10 p-6 rounded-xl">
    
    <p className="text-gray-300 mb-3">
    {r.text}
    </p>
    
    <p className="font-semibold">
    {r.name}
    </p>
    
    </div>
    ))}
    
    </div>
    
    </section>
    
    )
    
    }