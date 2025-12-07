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
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            layout
            className={`lg:col-span-2 ${activeSection !== 'time' ? 'hidden lg:block' : ''}`}
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
            className="hidden lg:block"
          >
            <StatsDashboard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:block"
        >
          <TaskBoard />
        </motion.div>

        <div className="h-32" />
      </div>

      <FloatingDock activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default App
