import { motion } from 'framer-motion'
import { Sun, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const greetings = [
    "Good vibes only, friend",
    "Ready to create something beautiful?",
    "Let's make today count",
    "Your peaceful productivity space",
  ]
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-4 mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sun className="w-7 h-7 text-sandstone" />
        </motion.div>
        <span className="text-sakura font-bold text-sm uppercase tracking-[0.2em]">
          Dopamine Station
        </span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-6 h-6 text-matcha" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-hand text-5xl md:text-6xl text-text mb-6"
      >
        {randomGreeting}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-text-light text-lg max-w-xl mx-auto font-light leading-relaxed"
      >
        Track your time. Complete quests. Find your flow.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10 h-1 bg-gradient-to-r from-transparent via-sakura/30 to-transparent max-w-md mx-auto rounded-full"
      />
    </motion.div>
  )
}
