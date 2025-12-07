import { motion } from 'framer-motion'
import { Clock, BarChart3, ListTodo, Sparkles } from 'lucide-react'

const dockItems = [
  { icon: Clock, label: 'Time', section: 'time' },
  { icon: BarChart3, label: 'Stats', section: 'stats' },
  { icon: ListTodo, label: 'Tasks', section: 'tasks' },
]

export default function FloatingDock({ activeSection, setActiveSection }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 bg-void-black/90 backdrop-blur-sm border-4 border-hot-pink px-4 py-3 shadow-[0_0_30px_#FF00FF]">
        {dockItems.map((item, index) => (
          <motion.button
            key={item.section}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveSection(item.section)}
            className={`relative p-3 rounded-none border-4 border-black transition-all ${
              activeSection === item.section
                ? 'bg-hot-pink text-black shadow-brutal-sm'
                : 'bg-void-black text-white hover:bg-gray-900'
            }`}
          >
            <item.icon className="w-6 h-6" />
            
            {activeSection === item.section && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute -top-2 left-1/2 transform -translate-x-1/2"
              >
                <Sparkles className="w-4 h-4 text-arcade-yellow" />
              </motion.div>
            )}
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-electric-blue whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
