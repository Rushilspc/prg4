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
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-6 py-4 rounded-full shadow-xl border border-gray-100">
        {dockItems.map((item, index) => (
          <motion.button
            key={item.section}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(item.section)}
            className={`relative p-4 rounded-full transition-all ${
              activeSection === item.section
                ? 'bg-gradient-to-r from-sakura to-sandstone text-white shadow-lg'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-6 h-6" />

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-text whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
