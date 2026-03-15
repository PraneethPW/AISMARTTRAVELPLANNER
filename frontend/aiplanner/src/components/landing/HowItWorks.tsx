export default function HowItWorks(){

    const steps = [
    
    {
    title:"Enter Your Trip",
    desc:"Add start location, destination, budget and travel days."
    },
    
    {
    title:"AI Generates Plan",
    desc:"Our AI analyzes routes, transport options and crowd data."
    },
    
    {
    title:"Explore Your Journey",
    desc:"Visualize routes on maps and discover hotels and places."
    }
    
    ]
    
    return(
    
    <section className="py-28 px-6">
    
    <h2 className="text-4xl font-bold text-center mb-16">
    How It Works
    </h2>
    
    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    
    {steps.map((s,i)=>(
    <div
    key={i}
    className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
    >
    
    <h3 className="text-xl font-semibold mb-3">
    {s.title}
    </h3>
    
    <p className="text-white/70">
    {s.desc}
    </p>
    
    </div>
    ))}
    
    </div>
    
    </section>
    
    )
    
    }