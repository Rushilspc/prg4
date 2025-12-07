import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Zap, Trash2, Plus } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useHours } from '../context/HoursContext'

const categories = [
  { value: 'grind', label: '🔥 Grind', color: 'bg-hot-pink' },
  { value: 'deep-work', label: '🧠 Deep Work', color: 'bg-electric-blue' },
  { value: 'admin', label: '📋 Admin', color: 'bg-lime-green' },
  { value: 'creative', label: '🎨 Creative', color: 'bg-neon-purple' },
]

export default function TimeTracker() {
  const { logs, addLog, deleteLog } = useHours()
  const [taskName, setTaskName] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [category, setCategory] = useState('grind')
  const [showLevelUp, setShowLevelUp] = useState(false)

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF00FF', '#00FFFF', '#32CD32', '#FFE500']
    })
    
    setShowLevelUp(true)
    setTimeout(() => setShowLevelUp(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName.trim() || (hours === 0 && minutes === 0)) return

    addLog({
      taskName,
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      category
    })

    triggerCelebration()
    setTaskName('')
    setHours(0)
    setMinutes(0)
  }

  const getCategoryInfo = (cat) => {
    return categories.find(c => c.value === cat) || categories[0]
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="text-6xl font-glitch text-arcade-yellow drop-shadow-[0_0_30px_#FFE500]">
              LEVEL UP! 🚀
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-void-black border-4 border-hot-pink p-6 rounded-none shadow-brutal"
      >
        <h2 className="font-glitch text-3xl text-hot-pink mb-6 flex items-center gap-3">
          <Clock className="w-8 h-8" />
          TIME MACHINE
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lime-green font-bold mb-2">Mission Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="What did you conquer?"
              className="w-full p-3 bg-void-black border-4 border-electric-blue text-white font-space focus:border-hot-pink focus:shadow-neon-pink outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lime-green font-bold mb-2">Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full p-3 bg-void-black border-4 border-electric-blue text-white font-space text-center text-2xl focus:border-hot-pink outline-none"
              />
            </div>
            <div>
              <label className="block text-lime-green font-bold mb-2">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full p-3 bg-void-black border-4 border-electric-blue text-white font-space text-center text-2xl focus:border-hot-pink outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-lime-green font-bold mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 border-4 border-black font-bold transition-all ${
                    category === cat.value
                      ? `${cat.color} text-black shadow-brutal-sm`
                      : 'bg-void-black text-white hover:bg-gray-900'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-4 bg-lime-green text-black font-bold text-xl border-4 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-6 h-6" />
            LOG COMPLETED MISSION
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 space-y-3"
      >
        <h3 className="font-glitch text-xl text-electric-blue">Recent Logs</h3>
        <AnimatePresence>
          {logs.slice(-5).reverse().map((log, index) => {
            const catInfo = getCategoryInfo(log.category)
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className={`${catInfo.color} p-4 border-4 border-black shadow-brutal-sm flex justify-between items-center`}
              >
                <div className="text-black">
                  <div className="font-bold">{log.taskName}</div>
                  <div className="text-sm opacity-80">
                    {log.hours}h {log.minutes}m • {catInfo.label}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteLog(log.id)}
                  className="p-2 bg-void-black text-hot-pink border-2 border-black hover:bg-hot-pink hover:text-black transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
