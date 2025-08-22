import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ActivityItem from "@/components/molecules/ActivityItem"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { dashboardService } from "@/services/api/dashboardService"

const ActivityFeed = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadActivities = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await dashboardService.getActivityItems()
      setActivities(data)
    } catch (err) {
      setError("Failed to load activity feed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [])

  if (loading) return <Loading variant="activity" />

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadActivities}
      />
    )
  }

  if (activities.length === 0) {
    return (
      <Empty
        title="No activity yet"
        description="Activity will appear here as candidates apply, interviews are scheduled, and placements are made."
        icon="Activity"
      />
    )
  }

  return (
    <motion.div
      className="bg-white rounded-xl card-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Activity" className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
          </div>
          <span className="text-sm text-gray-500">
            {activities.length} activities
          </span>
        </div>
      </div>
      
      <div className="p-2">
        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.Id}
            activity={activity}
            index={index}
          />
        ))}
      </div>
      
      <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          View all activity →
        </button>
      </div>
    </motion.div>
  )
}

export default ActivityFeed