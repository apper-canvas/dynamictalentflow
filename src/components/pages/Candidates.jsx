import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Candidates = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Users" className="w-10 h-10 text-blue-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Candidate Management
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Comprehensive candidate profile browser with advanced search and filtering capabilities
      </p>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Construction" className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Coming Soon
        </h2>
        <p className="text-gray-600 mb-6">
          Full candidate profile browser with search, filtering, skills matching, and detailed candidate information management.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Profile Search</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Skills Matching</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Resume Upload</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Interview Notes</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Candidates