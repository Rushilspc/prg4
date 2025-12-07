import { createContext, useContext, useState, useEffect } from 'react'

const HoursContext = createContext()

export function useHours() {
  return useContext(HoursContext)
}

function getISOWeek(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return weekNo
}

function getDateString(date) {
  return date.toISOString().split('T')[0]
}

export function HoursProvider({ children }) {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('dopamine-logs')
    return saved ? JSON.parse(saved) : []
  })

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('dopamine-tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [dailyGoal] = useState(8)
  const [weeklyGoal] = useState(40)

  useEffect(() => {
    localStorage.setItem('dopamine-logs', JSON.stringify(logs))
  }, [logs])

  useEffect(() => {
    localStorage.setItem('dopamine-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addLog = (log) => {
    const newLog = {
      ...log,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      date: getDateString(new Date())
    }
    setLogs(prev => [...prev, newLog])
    return newLog
  }

  const deleteLog = (id) => {
    setLogs(prev => prev.filter(log => log.id !== id))
  }

  const getDailyTotal = () => {
    const today = getDateString(new Date())
    return logs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + log.hours + (log.minutes / 60), 0)
  }

  const getWeeklyTotal = () => {
    const currentWeek = getISOWeek(new Date())
    const currentYear = new Date().getFullYear()
    
    return logs
      .filter(log => {
        const logDate = new Date(log.date)
        return getISOWeek(logDate) === currentWeek && logDate.getFullYear() === currentYear
      })
      .reduce((sum, log) => sum + log.hours + (log.minutes / 60), 0)
  }

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [...prev, newTask])
    return newTask
  }

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const value = {
    logs,
    tasks,
    dailyGoal,
    weeklyGoal,
    addLog,
    deleteLog,
    getDailyTotal,
    getWeeklyTotal,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  }

  return (
    <HoursContext.Provider value={value}>
      {children}
    </HoursContext.Provider>
  )
}
