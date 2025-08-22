import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { toast } from "react-toastify"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CompanyCard = ({ company, index }) => {
  const navigate = useNavigate()

  const handleViewProfile = () => {
    navigate(`/companies/${company.Id}`)
  }

  const handleContact = () => {
    toast.info(`Contacting ${company.primaryContact.name} at ${company.primaryContact.email}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "success"
      case "Opportunity": return "warning"
      case "Needs Attention": return "error"
      default: return "default"
    }
  }

  const getHealthColor = (health) => {
    switch (health) {
      case "excellent": return "text-green-600 bg-green-50 border-green-200"
      case "good": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "attention": return "text-red-600 bg-red-50 border-red-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getHealthIcon = (health) => {
    switch (health) {
      case "excellent": return "TrendingUp"
      case "good": return "Minus"
      case "attention": return "TrendingDown"
      default: return "Minus"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <div className="p-6">
        {/* Header with Logo and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">{company.industry}</p>
              <div className="flex items-center text-xs text-gray-500">
                <ApperIcon name="Users" size={12} className="mr-1" />
                <span>{company.employeeCount.toLocaleString()} employees</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={getStatusColor(company.relationshipStatus)} size="sm" className="mb-2">
              {company.relationshipStatus}
            </Badge>
            <div className={`flex items-center px-2 py-1 rounded-full border text-xs ${getHealthColor(company.relationshipHealth)}`}>
              <ApperIcon name={getHealthIcon(company.relationshipHealth)} size={12} className="mr-1" />
              <span className="capitalize">{company.relationshipHealth}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-lg font-semibold text-blue-600">
              {company.openPositions}
            </div>
            <div className="text-xs text-blue-600 font-medium">Open Positions</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-lg font-semibold text-green-600">
              {company.successfulPlacements}
            </div>
            <div className="text-xs text-green-600 font-medium">Placements</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-xs font-semibold text-purple-600">
              {(() => {
                try {
                  const date = new Date(company.lastInteraction);
                  return formatDistanceToNow(date, { addSuffix: true });
                } catch {
                  return 'Recently';
                }
              })()}
            </div>
            <div className="text-xs text-purple-600 font-medium">Last Contact</div>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {company.primaryContact.name}
              </p>
              <p className="text-xs text-gray-600">
                {company.primaryContact.title}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleContact}
              className="text-blue-600 hover:text-blue-700"
            >
              <ApperIcon name="Mail" size={14} />
            </Button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <ApperIcon name="MapPin" size={14} className="mr-2" />
          <span>{company.location}</span>
        </div>

        {/* Top Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {company.hiringPreferences.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="info" size="sm" className="text-xs">
                {skill}
              </Badge>
            ))}
            {company.hiringPreferences.length > 3 && (
              <Badge variant="default" size="sm" className="text-xs">
                +{company.hiringPreferences.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleViewProfile}
          >
            <ApperIcon name="Building2" size={14} className="mr-2" />
            View Profile
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleContact}
          >
            <ApperIcon name="MessageSquare" size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default CompanyCard