import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Analytics = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="PieChart" className="w-10 h-10 text-purple-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Analytics & Reports
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Detailed performance tracking and recruitment insights
      </p>
      
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Construction" className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600 mb-6">
          Comprehensive reporting and performance insights with detailed analytics, trends, and recruitment metrics.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Performance Reports</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Trend Analysis</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Success Metrics</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Custom Dashboards</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Analytics