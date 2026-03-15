import { Brain, Map, Hotel } from "lucide-react"
import { motion } from "framer-motion"

export default function Features() {

  const features = [
    {
      icon: <Brain size={32} />,
      title: "AI Trip Planning",
      desc: "Generate optimized travel plans instantly using AI based on budget, days and interests."
    },
    {
      icon: <Map size={32} />,
      title: "Interactive Route Maps",
      desc: "Visualize travel routes on dynamic maps with markers and route paths."
    },
    {
      icon: <Hotel size={32} />,
      title: "Hotel Suggestions",
      desc: "Discover affordable hotels and accommodations tailored to your travel plan."
    }
  ]

  return (

    <section className="py-28 px-6">

      <h2 className="text-4xl font-bold text-center mb-20 tracking-tight">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {features.map((feature, i) => (

          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="
            p-8
            rounded-2xl
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            shadow-xl
            hover:border-orange-400/40
            transition
            "
          >

            <div className="mb-5 text-orange-400">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {feature.title}
            </h3>

            <p className="text-white/70 leading-relaxed">
              {feature.desc}
            </p>

          </motion.div>

        ))}

      </div>

    </section>

  )
}