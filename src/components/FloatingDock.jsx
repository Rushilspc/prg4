import { motion } from 'framer-motion'
import { BookOpen, BarChart3, ClipboardList } from 'lucide-react'

const dockItems = [
  { icon: BookOpen, label: 'Journal', section: 'time' },
  { icon: BarChart3, label: 'Progress', section: 'stats' },
  { icon: ClipboardList, label: 'Tasks', section: 'tasks' },
]

export default function FloatingDock({ activeSection, setActiveSection }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-lg">
        {dockItems.map((item, index) => (
          <motion.button
            key={item.section}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(item.section)}
            className={`relative p-3 rounded-full transition-all ${
              activeSection === item.section
                ? 'bg-gradient-to-r from-sakura to-sandstone text-white shadow-md'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-5 h-5" />
            
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-light whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
