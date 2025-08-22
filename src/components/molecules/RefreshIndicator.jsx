import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import ApperIcon from "@/components/ApperIcon"

const RefreshIndicator = ({ lastUpdated, onRefresh, isLoading = false }) => {
  return (
    <div className="flex items-center justify-between">
<div className="flex items-center space-x-2 text-sm text-gray-600">
        <ApperIcon name="Clock" className="w-4 h-4" />
        <span>
          Last updated {(() => {
            try {
              const date = lastUpdated ? new Date(lastUpdated) : null;
              return date && !isNaN(date.getTime()) 
                ? formatDistanceToNow(date, { addSuffix: true })
                : 'unknown';
            } catch (error) {
              return 'unknown';
            }
          })()}
        </span>
      </div>
      
      <motion.button
        onClick={onRefresh}
        disabled={isLoading}
        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
          transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
        </motion.div>
        <span>Refresh</span>
      </motion.button>
    </div>
  )
}

export default RefreshIndicator