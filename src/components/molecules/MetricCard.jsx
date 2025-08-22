import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  gradient,
  delay = 0 
}) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case "up": return "text-green-600"
      case "down": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return "TrendingUp"
      case "down": return "TrendingDown"
      default: return "Minus"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-6 card-shadow hover:card-shadow-lg transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient}`}>
          <ApperIcon 
            name={icon} 
            className="w-6 h-6 text-white"
          />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <ApperIcon 
              name={getTrendIcon(trend)} 
              className="w-4 h-4" 
            />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <motion.h3 
          className="text-3xl font-bold text-gray-900 animate-countup"
          key={value}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.h3>
        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
          {title}
        </p>
      </div>
    </motion.div>
  )
}

export default MetricCard