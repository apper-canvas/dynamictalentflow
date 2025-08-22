import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Companies = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Building2" className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Company Management
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Client relationship management and hiring requirement tracking
      </p>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border border-green-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Construction" className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600 mb-6">
          Complete client relationship and requirement management with company profiles, hiring needs, and partnership tracking.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Client Profiles</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Hiring Needs</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Contact Management</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Partnership Tracking</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Companies