import { motion } from "framer-motion"

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah",
      text: "This planner saved me hours of travel planning and gave amazing route suggestions.",
      initials: "SA",
    },
    {
      name: "Arjun",
      text: "The AI route optimization is incredible. It suggested faster travel options.",
      initials: "AR",
    },
    {
      name: "David",
      text: "Best travel AI I have used. The crowd prediction feature is extremely helpful.",
      initials: "DA",
    },
  ]

  return (
    <section className="px-6 py-24">
      <h2 className="mb-16 text-center text-4xl font-bold">What Travelers Say</h2>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <motion.div
            key={review.name}
            whileHover={{ y: -10 }}
            className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition hover:border-cyan-300"
          >
            <p className="mb-6 italic text-gray-300">"{review.text}"</p>

            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                {review.initials}
              </div>

              <p className="font-semibold">{review.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
