import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { toast } from "react-toastify"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { updateJob, deleteJob } from "@/services/api/jobService"

const JobCard = ({ job, index, onJobUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "success"
      case "Filled": return "primary"
      case "On Hold": return "warning"
      default: return "default"
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedJob = await updateJob(job.Id, { status: newStatus })
      onJobUpdate(updatedJob)
      toast.success(`Job status updated to ${newStatus}`)
    } catch (error) {
      toast.error("Failed to update job status")
    }
  }

  const handleEdit = () => {
    toast.info("Edit job functionality coming soon")
  }

const handleViewMatches = () => {
    if (job.matchCount === 0) {
      toast.info("No matches found for this position")
      return
    }

    // Create detailed match information
    const matchDetails = job.matches.map(match => 
      `• ${match.name} (${match.compatibilityScore}% match) - Skills: ${match.skills.join(', ')}`
    ).join('\n')

    const message = `Strong Matches for ${job.title}:\n\n${matchDetails}\n\nCompatibility scores are based on skill alignment and experience relevance.`
    
    // Show detailed match information
    if (window.confirm(message + '\n\nWould you like to see detailed candidate profiles?')) {
      toast.success(`Found ${job.matchCount} highly compatible candidates for review`)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the ${job.title} position?`)) {
      try {
        await deleteJob(job.Id)
        onJobUpdate(null, job.Id)
        toast.success("Job deleted successfully")
      } catch (error) {
        toast.error("Failed to delete job")
      }
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl card-shadow hover:card-shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="p-6">
        {/* Header with Company Logo and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-xs text-gray-500">{job.department}</p>
            </div>
          </div>
          <Badge variant={getStatusColor(job.status)} size="sm">
            {job.status}
          </Badge>
        </div>

        {/* Location and Salary */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <ApperIcon name="MapPin" size={14} className="mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="text-gray-900 font-medium">
              {job.salaryRange}
            </div>
          </div>
        </div>

        {/* Posted Date and Applicants */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </span>
          <div className="flex items-center">
            <ApperIcon name="Users" size={14} className="mr-1" />
            <span>{job.applicantCount} applicants</span>
          </div>
        </div>

        {/* Match Indicator */}
        {job.matchCount > 0 && (
          <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="info" size="sm">
                  {job.matchCount} Strong Match{job.matchCount !== 1 ? 'es' : ''}
                </Badge>
                <div className="flex -space-x-1">
                  {job.matches.slice(0, 3).map((match, index) => (
                    <img
                      key={match.Id}
                      src={match.photo}
                      alt={match.name}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      title={match.name}
                    />
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleViewMatches}
                className="text-blue-600 hover:text-blue-700"
              >
                View
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="text-gray-600 hover:text-gray-900"
            >
              <ApperIcon name="Edit" size={14} className="mr-1" />
              Edit
            </Button>
            
            {job.status === "Open" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStatusChange("Filled")}
                className="text-green-600 hover:text-green-700"
              >
                <ApperIcon name="CheckCircle" size={14} className="mr-1" />
                Close
              </Button>
            )}

            {job.status === "Filled" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStatusChange("Open")}
                className="text-blue-600 hover:text-blue-700"
              >
                <ApperIcon name="RefreshCw" size={14} className="mr-1" />
                Reopen
              </Button>
            )}

            {job.status === "On Hold" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStatusChange("Open")}
                className="text-green-600 hover:text-green-700"
              >
                <ApperIcon name="Play" size={14} className="mr-1" />
                Resume
              </Button>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
          >
            <ApperIcon name="Trash2" size={14} />
          </Button>
        </div>

        {job.matchCount > 0 && (
          <Button
            variant="primary"
            size="sm"
            className="w-full mt-3"
            onClick={handleViewMatches}
          >
            <ApperIcon name="Users" size={14} className="mr-2" />
            View Matches ({job.matchCount})
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default JobCard