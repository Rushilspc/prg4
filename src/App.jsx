import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from './components/HeroSection'
import TimeTracker from './components/TimeTracker'
import StatsDashboard from './components/StatsDashboard'
import TaskBoard from './components/TaskBoard'
import FloatingDock from './components/FloatingDock'

function App() {
  const [activeSection, setActiveSection] = useState('time')

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 pb-24">
          <motion.div
            layout
            className={`lg:col-span-2 ${activeSection !== 'time' && 'lg:hidden'} ${activeSection === 'time' ? '' : 'hidden lg:block'}`}
          >
            <AnimatePresence mode="wait">
              {activeSection === 'time' && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimeTracker />
                </motion.div>
              )}
              {activeSection === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatsDashboard />
                </motion.div>
              )}
              {activeSection === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskBoard />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 hidden lg:block"
          >
            <StatsDashboard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 hidden lg:block pb-24"
        >
          <TaskBoard />
        </motion.div>
      </div>

      <FloatingDock activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default App
