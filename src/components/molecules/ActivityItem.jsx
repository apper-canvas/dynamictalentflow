import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const ActivityItem = ({ activity, index }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "candidate": return "User"
      case "interview": return "Calendar"
      case "placement": return "CheckCircle"
      default: return "Activity"
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "candidate": return "from-blue-500 to-blue-600"
      case "interview": return "from-orange-500 to-orange-600"
      case "placement": return "from-green-500 to-green-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  const getBadgeVariant = (status) => {
    switch (status) {
      case "new": return "info"
      case "scheduled": return "warning"
      case "confirmed": return "success"
      case "signed": return "success"
      case "completed": return "primary"
      case "updated": return "default"
      case "rescheduled": return "warning"
      default: return "default"
    }
  }

  return (
    <motion.div
      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
        <ApperIcon 
          name={getActivityIcon(activity.type)} 
          className="w-5 h-5 text-white" 
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {activity.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {activity.description}
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
              <Badge 
                variant={getBadgeVariant(activity.status)}
                size="sm"
              >
                {activity.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ActivityItem