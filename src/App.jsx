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
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
          <motion.div
            layout
            className={`lg:col-span-7 ${activeSection !== 'time' ? 'hidden lg:block' : ''}`}
          >
            <AnimatePresence mode="wait">
              {activeSection === 'time' && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
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
                  className="h-full"
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
                  className="h-full"
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
            className="lg:col-span-5 hidden lg:block h-full"
          >
            <StatsDashboard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 hidden lg:block"
        >
          <TaskBoard />
        </motion.div>

        <div className="mt-24" />
      </div>

      <FloatingDock activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default App
