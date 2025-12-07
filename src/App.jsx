import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import TimeTracker from './components/TimeTracker'
import StatsDashboard from './components/StatsDashboard'
import TaskBoard from './components/TaskBoard'
import FloatingDock from './components/FloatingDock'

function App() {
  const [activeSection, setActiveSection] = useState('time')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-void-black grid-background relative overflow-hidden">
      <motion.div
        className="pointer-events-none fixed z-[9999] w-6 h-6 rounded-full border-4 border-hot-pink mix-blend-difference"
        animate={{
          x: cursorPos.x - 12,
          y: cursorPos.y - 12,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          boxShadow: isClicking ? '0 0 20px #FF00FF' : '0 0 10px #FF00FF'
        }}
      />

      <div className="container mx-auto px-4 py-8 pb-24">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          <motion.div
            layout
            className={`lg:col-span-2 ${activeSection !== 'time' && 'lg:hidden'} ${activeSection === 'time' ? '' : 'hidden lg:block'}`}
          >
            <AnimatePresence mode="wait">
              {activeSection === 'time' && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                >
                  <TimeTracker />
                </motion.div>
              )}
              {activeSection === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                >
                  <StatsDashboard />
                </motion.div>
              )}
              {activeSection === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                >
                  <TaskBoard />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 hidden lg:block"
          >
            <StatsDashboard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 hidden lg:block"
        >
          <TaskBoard />
        </motion.div>
      </div>

      <FloatingDock activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default App
