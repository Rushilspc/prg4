import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, Plus, Trash2, Check, Edit3, X, Save } from 'lucide-react'
import { useHours } from '../context/HoursContext'

const priorities = [
  { value: 'legendary', label: '⚔️ Legendary', color: 'bg-hot-pink', border: 'border-hot-pink' },
  { value: 'epic', label: '🏆 Epic', color: 'bg-neon-purple', border: 'border-neon-purple' },
  { value: 'rare', label: '💎 Rare', color: 'bg-electric-blue', border: 'border-electric-blue' },
  { value: 'common', label: '🌿 Common', color: 'bg-lime-green', border: 'border-lime-green' },
]

export default function TaskBoard() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useHours()
  const [newTask, setNewTask] = useState('')
  const [newPriority, setNewPriority] = useState('common')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    addTask({ text: newTask, priority: newPriority })
    setNewTask('')
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = (id) => {
    if (editText.trim()) {
      updateTask(id, { text: editText })
    }
    setEditingId(null)
    setEditText('')
  }

  const getPriorityInfo = (priority) => {
    return priorities.find(p => p.value === priority) || priorities[3]
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-void-black border-4 border-lime-green p-6 shadow-brutal"
    >
      <h2 className="font-glitch text-3xl text-lime-green mb-6 flex items-center gap-3">
        <Swords className="w-8 h-8" />
        MISSION BOARD
      </h2>

      <form onSubmit={handleAddTask} className="space-y-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new quest..."
            className="flex-1 p-3 bg-void-black border-4 border-arcade-yellow text-white font-space focus:border-hot-pink outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-arcade-yellow text-black font-bold border-4 border-black shadow-brutal-sm"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <motion.button
              key={p.value}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNewPriority(p.value)}
              className={`px-3 py-1 border-2 font-bold text-sm transition-all ${
                newPriority === p.value
                  ? `${p.color} text-black border-black`
                  : `bg-transparent ${p.border} text-white`
              }`}
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      </form>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence>
          {sortedTasks.map((task, index) => {
            const priorityInfo = getPriorityInfo(task.priority)
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -50, rotateX: -15 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, rotate: task.completed ? 0 : 1 }}
                className={`relative p-4 border-4 border-black shadow-brutal-sm transition-all ${
                  task.completed
                    ? 'bg-gray-800 opacity-60'
                    : priorityInfo.color
                }`}
              >
                {task.completed && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-black rotate-[-3deg]" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center ${
                      task.completed ? 'bg-lime-green' : 'bg-white'
                    }`}
                  >
                    {task.completed && <Check className="w-5 h-5 text-black" />}
                  </motion.button>

                  <div className="flex-1">
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 bg-white text-black border-2 border-black font-space"
                        autoFocus
                      />
                    ) : (
                      <div className={`font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-black'}`}>
                        {task.text}
                      </div>
                    )}
                    <div className={`text-xs ${task.completed ? 'text-gray-500' : 'text-black opacity-70'}`}>
                      {priorityInfo.label}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {editingId === task.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => saveEdit(task.id)}
                          className="p-2 bg-lime-green text-black border-2 border-black"
                        >
                          <Save className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-hot-pink text-black border-2 border-black"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startEdit(task)}
                          className="p-2 bg-electric-blue text-black border-2 border-black"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTask(task.id)}
                          className="p-2 bg-void-black text-hot-pink border-2 border-black hover:bg-hot-pink hover:text-black transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            <Swords className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="font-glitch text-xl">No quests yet!</p>
            <p className="text-sm">Add your first mission above</p>
          </motion.div>
        )}
      </div>

      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t-4 border-gray-800 flex justify-between items-center"
        >
          <span className="text-gray-400">
            {tasks.filter(t => t.completed).length} / {tasks.length} completed
          </span>
          <div className="flex gap-2">
            {priorities.map((p) => {
              const count = tasks.filter(t => t.priority === p.value && !t.completed).length
              if (count === 0) return null
              return (
                <span key={p.value} className={`${p.color} text-black px-2 py-1 text-xs font-bold border-2 border-black`}>
                  {count} {p.label.split(' ')[1]}
                </span>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
