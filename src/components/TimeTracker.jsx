import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Trash2, PenLine } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useHours } from '../context/HoursContext'

const categories = [
  { value: 'grind', label: 'Focus Time', color: 'bg-sakura/20 text-sakura', activeColor: 'bg-sakura text-white' },
  { value: 'deep-work', label: 'Deep Work', color: 'bg-sky/20 text-sky', activeColor: 'bg-sky text-white' },
  { value: 'admin', label: 'Admin', color: 'bg-matcha/20 text-matcha', activeColor: 'bg-matcha text-text' },
  { value: 'creative', label: 'Creative', color: 'bg-sandstone/20 text-sandstone', activeColor: 'bg-sandstone text-text' },
]

export default function TimeTracker() {
  const { logs, addLog, deleteLog } = useHours()
  const [taskName, setTaskName] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [category, setCategory] = useState('grind')
  const [showSuccess, setShowSuccess] = useState(false)

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FFB7B2', '#B5EAD7', '#A0C4FF', '#FFDAC1']
    })
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
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
    <div className="h-full flex flex-col">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="font-hand text-4xl text-matcha flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Beautiful work!
              <Sparkles className="w-8 h-8" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 h-full"
      >
        <h2 className="font-hand text-2xl font-bold text-text mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-sakura" />
          Journal Entry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-light font-medium mb-2 text-sm">What did you work on?</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Describe your accomplishment..."
              className="w-full h-12 px-4 bg-white rounded-xl text-text placeholder-gray-400 shadow-sm transition-all focus:shadow-md focus:bg-gray-50"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-text-light font-medium mb-2 text-sm">Hours</label>
              <input
                type="number"
                min="0"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full h-12 px-4 bg-white rounded-xl text-text text-center text-lg font-semibold shadow-sm transition-all focus:shadow-md focus:bg-gray-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-text-light font-medium mb-2 text-sm">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full h-12 px-4 bg-white rounded-xl text-text text-center text-lg font-semibold shadow-sm transition-all focus:shadow-md focus:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-light font-medium mb-3 text-sm">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCategory(cat.value)}
                  className={`h-11 rounded-xl font-medium text-sm transition-all ${
                    category === cat.value ? cat.activeColor : cat.color
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-12 watercolor-button text-white font-semibold flex items-center justify-center gap-2"
          >
            <PenLine className="w-5 h-5" />
            Log Entry
          </motion.button>
        </form>

        {logs.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-hand text-lg text-text-light mb-4">Recent Entries</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {logs.slice(-3).reverse().map((log, index) => {
                  const catInfo = getCategoryInfo(log.category)
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 p-4 rounded-xl flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium text-text text-sm">{log.taskName}</div>
                        <div className="text-xs text-text-light mt-1">
                          {log.hours}h {log.minutes}m · {catInfo.label}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteLog(log.id)}
                        className="p-2 text-text-light hover:text-sakura transition-colors rounded-full hover:bg-sakura/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
