import { motion } from 'framer-motion'
import { Battery, Target, TrendingUp, Flame } from 'lucide-react'
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
      className="bg-void-black border-4 border-electric-blue p-6 shadow-brutal"
    >
      <h2 className="font-glitch text-3xl text-electric-blue mb-6 flex items-center gap-3">
        <Battery className="w-8 h-8" />
        POWER METER
      </h2>

      <div className="space-y-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lime-green font-bold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Daily Power
            </span>
            <span className="text-hot-pink font-bold text-xl">
              {dailyTotal.toFixed(1)}h / {dailyGoal}h
            </span>
          </div>
          <div className="h-8 bg-gray-900 border-4 border-black relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dailyProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-lime-green via-arcade-yellow to-hot-pink"
              style={{
                boxShadow: dailyProgress > 50 ? '0 0 20px #32CD32' : 'none'
              }}
            />
            {dailyProgress >= 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              />
            )}
          </div>
          {dailyProgress >= 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 bg-arcade-yellow text-black px-2 py-1 font-bold text-sm border-2 border-black shadow-brutal-sm"
            >
              MAXED! 🔥
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lime-green font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weekly Power
            </span>
            <span className="text-hot-pink font-bold text-xl">
              {weeklyTotal.toFixed(1)}h / {weeklyGoal}h
            </span>
          </div>
          <div className="h-12 bg-gray-900 border-4 border-black relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full"
              style={{
                background: `linear-gradient(90deg, 
                  #32CD32 0%, 
                  #FFE500 ${Math.min(weeklyProgress, 50)}%, 
                  #FF00FF ${Math.min(weeklyProgress, 75)}%, 
                  #00FFFF 100%)`,
                boxShadow: weeklyProgress > 70 ? '0 0 30px #FF00FF' : 'none'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-lg text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                {weeklyProgress.toFixed(0)}%
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-hot-pink text-black p-4 border-4 border-black shadow-brutal-sm text-center"
          >
            <Flame className="w-8 h-8 mx-auto mb-2" />
            <div className="font-glitch text-3xl">{streak}</div>
            <div className="font-bold text-sm">DAY STREAK</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-electric-blue text-black p-4 border-4 border-black shadow-brutal-sm text-center"
          >
            <Target className="w-8 h-8 mx-auto mb-2" />
            <div className="font-glitch text-3xl">{logs.length}</div>
            <div className="font-bold text-sm">TOTAL LOGS</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center pt-4 border-t-4 border-gray-800"
        >
          <p className="text-gray-400 text-sm">
            {weeklyProgress < 25 && "🌱 Just getting started! Keep pushing!"}
            {weeklyProgress >= 25 && weeklyProgress < 50 && "⚡ You're warming up! Don't stop now!"}
            {weeklyProgress >= 50 && weeklyProgress < 75 && "🔥 Halfway there! You're on fire!"}
            {weeklyProgress >= 75 && weeklyProgress < 100 && "🚀 Almost at the peak! Final push!"}
            {weeklyProgress >= 100 && "👑 LEGENDARY STATUS ACHIEVED!"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
