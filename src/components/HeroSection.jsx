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
      className="text-center py-12 mb-8"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-3 mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sun className="w-8 h-8 text-sandstone" />
        </motion.div>
        <span className="text-sakura font-semibold text-sm uppercase tracking-widest">
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
        className="font-hand text-4xl md:text-5xl lg:text-6xl text-text mb-4"
      >
        {randomGreeting}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-text-light text-lg max-w-md mx-auto font-light"
      >
        Track your time. Complete quests. Find your flow.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 h-1 bg-gradient-to-r from-transparent via-sakura/50 to-transparent max-w-xs mx-auto rounded-full"
      />
    </motion.div>
  )
}
