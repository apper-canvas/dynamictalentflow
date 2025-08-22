import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { formatDistanceToNow } from "date-fns"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getJobById } from "@/services/api/jobService"

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true)
        setError(null)
        const jobData = await getJobById(id)
        if (jobData) {
          setJob(jobData)
        } else {
          setError("Job not found")
        }
      } catch (err) {
        setError("Failed to load job details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadJob()
    }
  }, [id])

  const handleBack = () => {
    navigate("/jobs")
  }

  const handleContactCandidate = (candidate) => {
    toast.success(`Contacting ${candidate.name} for ${job.title} position`)
  }

  const handleViewCandidateProfile = (candidateId) => {
    navigate(`/candidates/${candidateId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "success"
      case "Filled": return "primary" 
      case "On Hold": return "warning"
      default: return "default"
    }
  }

  const getCompatibilityColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />
  if (!job) return <Error message="Job not found" />

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBack}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Back to Jobs</span>
        </Button>
        <Badge variant={getStatusColor(job.status)}>
          {job.status}
        </Badge>
      </div>

      {/* Job Information */}
      <div className="bg-white rounded-xl card-shadow p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Company Logo */}
          <div className="flex-shrink-0 text-center lg:text-left mb-6 lg:mb-0">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-24 h-24 rounded-xl object-cover mx-auto lg:mx-0 mb-4 border-4 border-gray-100"
            />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{job.department}</p>
              <div className="flex items-center justify-center lg:justify-start text-gray-600 text-sm">
                <ApperIcon name="MapPin" size={14} className="mr-1" />
                {job.location}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">
                {job.company}
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="info">{job.type}</Badge>
                <Badge variant="default">{job.salaryRange}</Badge>
              </div>
            </div>

            {/* Job Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {job.applicantCount}
                </div>
                <p className="text-sm text-gray-600">Applicants</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {job.matchCount}
                </div>
                <p className="text-sm text-gray-600">Strong Matches</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Posted</div>
                <div className="font-medium text-gray-900">
                  {(() => {
                    try {
                      const date = job.postedDate ? new Date(job.postedDate) : null;
                      return date && !isNaN(date.getTime()) 
                        ? formatDistanceToNow(date, { addSuffix: true })
                        : 'recently';
                    } catch (error) {
                      return 'recently';
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((requirement, index) => (
                  <Badge key={index} variant="info" className="text-sm">
                    {requirement}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Matching Candidates */}
      {job.matches && job.matches.length > 0 && (
        <div className="bg-white rounded-xl card-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <ApperIcon name="Users" size={20} className="mr-2" />
              Matching Candidates ({job.matches.length})
            </h3>
            <Badge variant="info" size="sm">
              Based on skill compatibility
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {job.matches.map((candidate, index) => (
              <motion.div
                key={candidate.Id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-all duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleViewCandidateProfile(candidate.Id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-gray-100"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                        {candidate.name}
                      </h4>
                      <p className="text-sm text-gray-600">Available Candidate</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCompatibilityColor(candidate.compatibilityScore)}`}>
                    {candidate.compatibilityScore}% match
                  </div>
                </div>

                {/* Matching Skills */}
                <div className="mb-3">
                  <p className="text-sm text-gray-500 mb-2">Matching Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="success" size="sm" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-3 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleContactCandidate(candidate)
                    }}
                    className="flex-1"
                  >
                    <ApperIcon name="Mail" size={14} className="mr-1" />
                    Contact
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewCandidateProfile(candidate.Id)
                    }}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ApperIcon name="Eye" size={14} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No Matches State */}
      {job.matches && job.matches.length === 0 && (
        <div className="bg-white rounded-xl card-shadow p-8 text-center">
          <ApperIcon name="Users" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Matches Found</h3>
          <p className="text-gray-600 mb-4">
            No candidates match the requirements for this position yet.
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate('/candidates')}
          >
            <ApperIcon name="Search" size={16} className="mr-2" />
            Browse All Candidates
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export default JobDetail