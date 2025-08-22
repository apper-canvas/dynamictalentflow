import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Jobs = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Briefcase" className="w-10 h-10 text-orange-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Job Management
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Comprehensive job posting management and opportunity matching tools
      </p>
      
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-100">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Construction" className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600 mb-6">
          Full job posting management with candidate matching, requirements tracking, and opportunity pipeline management.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Job Posting</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Candidate Matching</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Requirements</span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Pipeline Tracking</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Jobs