import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const CandidateCard = ({ candidate, index }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/candidates/${candidate.Id}`)
  }

  const getAvailabilityColor = (status) => {
    switch (status) {
      case "Available": return "success"
      case "Interviewing": return "warning"
      case "Not Available": return "default"
      default: return "default"
    }
  }

  const getExperienceColor = (level) => {
    switch (level) {
      case "Senior": return "primary"
      case "Mid-level": return "info"
      case "Junior": return "default"
      default: return "default"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={handleClick}
    >
      <div className="p-6">
        {/* Header with Photo and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {candidate.name}
              </h3>
              <p className="text-sm text-gray-600">{candidate.title}</p>
            </div>
          </div>
          <Badge variant={getAvailabilityColor(candidate.availability)} size="sm">
            {candidate.availability}
          </Badge>
        </div>

{/* Skills Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {(candidate.skills?.slice(0, 3) || []).map((skill, index) => (
              <Badge key={index} variant="info" size="sm" className="text-xs">
                {skill}
              </Badge>
            ))}
            {(candidate.skills?.length || 0) > 3 && (
              <Badge variant="default" size="sm" className="text-xs">
                +{(candidate.skills?.length || 0) - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Experience and Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <ApperIcon name="Award" size={14} className="mr-1" />
              <Badge variant={getExperienceColor(candidate.experience)} size="sm">
                {candidate.experience}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <ApperIcon name="MapPin" size={14} className="mr-1" />
              <span>{candidate.location}</span>
            </div>
            <div className="text-gray-500">
              {candidate.salaryRange}
            </div>
          </div>
        </div>

        {/* View Profile Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">Click to view profile</span>
          <ApperIcon 
            name="ChevronRight" 
            size={16} 
            className="text-gray-400 group-hover:text-primary-600 transition-colors" 
          />
        </div>
      </div>
    </motion.div>
  )
}

export default CandidateCard