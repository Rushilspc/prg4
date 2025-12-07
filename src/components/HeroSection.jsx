import { motion } from 'framer-motion'
import { Zap, Rocket } from 'lucide-react'

export default function HeroSection() {
  const greetings = [
    "Welcome to the Chaos, Master",
    "Ready to Grind, Legend?",
    "Time to Level Up!",
    "Productivity Mode: BEAST",
  ]
  
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="text-center py-8 mb-8 relative overflow-hidden"
    >
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, #FF00FF, #00FFFF, #32CD32, #FFE500)',
          backgroundSize: '400% 400%',
        }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-3 mb-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="w-10 h-10 text-arcade-yellow" />
        </motion.div>
        <span className="text-hot-pink font-bold text-sm uppercase tracking-widest">
          Dopamine Station
        </span>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-10 h-10 text-electric-blue" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative inline-block"
      >
        <span 
          className="glitch-text font-glitch text-4xl md:text-6xl lg:text-7xl"
          data-text={randomGreeting}
        >
          {randomGreeting}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto"
      >
        Track your time. Complete quests. Become legendary.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 h-1 bg-gradient-to-r from-transparent via-hot-pink to-transparent max-w-lg mx-auto"
      />
    </motion.div>
  )
}
