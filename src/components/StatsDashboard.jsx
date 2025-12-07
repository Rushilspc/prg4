import { motion } from 'framer-motion'
import { BarChart3, Sun, TrendingUp, Heart } from 'lucide-react'
import { useHours } from '../context/HoursContext'

export default function StatsDashboard() {
  const { getDailyTotal, getWeeklyTotal, dailyGoal, weeklyGoal, logs } = useHours()
  
  const dailyTotal = getDailyTotal()
  const weeklyTotal = getWeeklyTotal()
  const dailyProgress = Math.min((dailyTotal / dailyGoal) * 100, 100)
  const weeklyProgress = Math.min((weeklyTotal / weeklyGoal) * 100, 100)

  const getStreak = () => {
    const today = new Date()
    let streak = 0
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const dateStr = checkDate.toISOString().split('T')[0]
      const dayLogs = logs.filter(log => log.date === dateStr)
      if (dayLogs.length > 0) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  const streak = getStreak()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 h-full"
    >
      <h2 className="font-hand text-2xl font-bold text-text mb-6 flex items-center gap-3">
        <BarChart3 className="w-6 h-6 text-sky" />
        Your Progress
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-light font-medium text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-sandstone" />
              Today
            </span>
            <span className="text-text font-semibold text-sm">
              {dailyTotal.toFixed(1)}h / {dailyGoal}h
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full progress-stroke"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-light font-medium text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-matcha" />
              This Week
            </span>
            <span className="text-text font-semibold text-sm">
              {weeklyTotal.toFixed(1)}h / {weeklyGoal}h
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full progress-stroke"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-text/60">
                {weeklyProgress.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-sakura/10 p-4 rounded-2xl text-center"
          >
            <Heart className="w-5 h-5 mx-auto mb-1 text-sakura" />
            <div className="font-hand text-2xl text-text">{streak}</div>
            <div className="text-text-light text-xs">Day Streak</div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-sky/10 p-4 rounded-2xl text-center"
          >
            <BarChart3 className="w-5 h-5 mx-auto mb-1 text-sky" />
            <div className="font-hand text-2xl text-text">{logs.length}</div>
            <div className="text-text-light text-xs">Total Entries</div>
          </motion.div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-text-light text-sm italic text-center">
            {weeklyProgress < 25 && "Every journey begins with a single step."}
            {weeklyProgress >= 25 && weeklyProgress < 50 && "You're finding your rhythm!"}
            {weeklyProgress >= 50 && weeklyProgress < 75 && "Halfway there! Beautiful progress."}
            {weeklyProgress >= 75 && weeklyProgress < 100 && "Almost at the finish line!"}
            {weeklyProgress >= 100 && "You did it! Celebrate yourself."}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
