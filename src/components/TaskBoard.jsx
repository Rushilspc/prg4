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
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-10"
    >
      <h2 className="font-hand text-3xl font-bold text-text mb-10 flex items-center gap-3">
        <ClipboardList className="w-7 h-7 text-matcha" />
        Task Board
      </h2>

      <form onSubmit={handleAddTask} className="space-y-6 mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 h-14 px-5 bg-white rounded-2xl text-text placeholder-gray-400 shadow-sm transition-all focus:shadow-md focus:ring-2 focus:ring-matcha/20 border border-gray-100"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-matcha text-white rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-3">
          {priorities.map((p) => (
            <motion.button
              key={p.value}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setNewPriority(p.value)}
              className={`px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all shadow-sm ${
                newPriority === p.value
                  ? p.color.replace('/20', '') + ' shadow-md'
                  : p.color
              }`}
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      </form>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
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
                whileHover={{ y: -3 }}
                className={`p-5 rounded-2xl shadow-sm transition-all hover:shadow-md ${
                  task.completed ? 'bg-gray-50 opacity-60' : priorityInfo.noteColor
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTask(task.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      task.completed
                        ? 'bg-matcha text-white shadow-sm'
                        : 'bg-white border-2 border-gray-200 hover:border-matcha shadow-sm'
                    }`}
                  >
                    {task.completed && <Check className="w-5 h-5" />}
                  </motion.button>

                  <div className="flex-1 min-w-0">
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full h-10 px-4 bg-white rounded-xl text-text shadow-sm border border-gray-200"
                        autoFocus
                      />
                    ) : (
                      <div className={`font-semibold text-base mb-1 ${task.completed ? 'text-text-light line-through' : 'text-text'}`}>
                        {task.text}
                      </div>
                    )}
                    <div className="text-sm text-text-light font-medium">
                      {priorityInfo.label}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {editingId === task.id ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => saveEdit(task.id)}
                          className="p-2.5 text-matcha hover:bg-matcha/10 rounded-xl transition-colors"
                        >
                          <Save className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingId(null)}
                          className="p-2.5 text-text-light hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => startEdit(task)}
                          className="p-2.5 text-text-light hover:text-sky hover:bg-sky/10 rounded-xl transition-colors"
                        >
                          <Edit3 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteTask(task.id)}
                          className="p-2.5 text-text-light hover:text-sakura hover:bg-sakura/10 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
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
          <div className="text-center py-16 text-text-light">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-hand text-xl mb-2">No tasks yet</p>
            <p className="text-base">Add your first task above</p>
          </div>
        )}
      </div>

      {tasks.length > 0 && (
        <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
          <span className="text-text font-medium text-base">
            {tasks.filter(t => t.completed).length} of {tasks.length} completed
          </span>
        </div>
      )}
    </motion.div>
  )
}
