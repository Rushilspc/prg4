import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Plus, Trash2, Check, Edit3, X, Save } from 'lucide-react'
import { useHours } from '../context/HoursContext'

const priorities = [
  { value: 'legendary', label: 'Important', color: 'bg-sakura/20 text-sakura', noteColor: 'bg-gradient-to-br from-[#FFE4E1] to-[#FFF0EE]' },
  { value: 'epic', label: 'High', color: 'bg-sandstone/20 text-sandstone', noteColor: 'bg-gradient-to-br from-[#FFF3E8] to-[#FFFAF5]' },
  { value: 'rare', label: 'Medium', color: 'bg-sky/20 text-sky', noteColor: 'bg-gradient-to-br from-[#E8F4FF] to-[#F5FAFF]' },
  { value: 'common', label: 'Low', color: 'bg-matcha/20 text-matcha', noteColor: 'bg-gradient-to-br from-[#E8F5EC] to-[#F5FFF8]' },
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
      className="card-soft paper-texture p-8"
    >
      <h2 className="font-hand text-3xl text-text mb-6 flex items-center gap-3">
        <ClipboardList className="w-7 h-7 text-matcha" />
        Task Board
      </h2>

      <form onSubmit={handleAddTask} className="space-y-4 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-4 bg-gray-50 rounded-2xl text-text placeholder-gray-400 transition-all focus:bg-gray-100"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 bg-matcha text-white rounded-2xl shadow-soft hover:shadow-float transition-all"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <motion.button
              key={p.value}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setNewPriority(p.value)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                newPriority === p.value
                  ? p.color.replace('/20', '')
                  : p.color
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                className={`sticky-note p-4 rounded-2xl transition-all ${
                  task.completed ? 'opacity-60' : priorityInfo.noteColor
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      task.completed 
                        ? 'bg-matcha text-white' 
                        : 'bg-white border-2 border-gray-200 hover:border-matcha'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </motion.button>

                  <div className="flex-1">
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 bg-white rounded-lg text-text"
                        autoFocus
                      />
                    ) : (
                      <div className={`font-medium ${task.completed ? 'text-text-light line-through' : 'text-text'}`}>
                        {task.text}
                      </div>
                    )}
                    <div className="text-xs text-text-light mt-1">
                      {priorityInfo.label} priority
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {editingId === task.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => saveEdit(task.id)}
                          className="p-2 text-matcha hover:bg-matcha/10 rounded-full transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingId(null)}
                          className="p-2 text-text-light hover:bg-gray-100 rounded-full transition-colors"
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
                          className="p-2 text-text-light hover:text-sky hover:bg-sky/10 rounded-full transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-text-light hover:text-sakura hover:bg-sakura/10 rounded-full transition-colors"
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
            className="text-center py-12 text-text-light"
          >
            <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-hand text-xl">No tasks yet</p>
            <p className="text-sm">Add your first task above</p>
          </motion.div>
        )}
      </div>

      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center"
        >
          <span className="text-text-light text-sm">
            {tasks.filter(t => t.completed).length} of {tasks.length} completed
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
