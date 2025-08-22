import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { candidateService } from "@/services/api/candidateService"

const CandidateProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        setError("")
        setLoading(true)
        const data = await candidateService.getById(parseInt(id))
        if (data) {
          setCandidate(data)
          await candidateService.logCandidateView(data.Id, data.name)
          toast.success(`Viewing ${data.name}'s profile`)
        } else {
          setError("Candidate not found")
        }
      } catch (err) {
        setError("Failed to load candidate profile")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadCandidate()
    }
  }, [id])

  const handleBack = () => {
    navigate("/candidates")
  }

  const handleContact = () => {
    if (candidate) {
      toast.info(`Contact functionality for ${candidate.name} coming soon`)
    }
  }

  const handleScheduleInterview = () => {
    if (candidate) {
      toast.info(`Interview scheduling for ${candidate.name} coming soon`)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />
  if (!candidate) return <Error message="Candidate not found" />

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
          <span>Back to Candidates</span>
        </Button>
      </div>

      {/* Main Profile */}
      <div className="bg-white rounded-xl card-shadow p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
          {/* Profile Image & Basic Info */}
          <div className="flex-shrink-0 text-center lg:text-left mb-6 lg:mb-0">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-32 h-32 rounded-xl object-cover mx-auto lg:mx-0 mb-4 border-4 border-gray-100"
            />
            <div className="space-y-2">
              <Badge variant={getAvailabilityColor(candidate.availability)}>
                {candidate.availability}
              </Badge>
              <div className="flex items-center justify-center lg:justify-start text-gray-600 text-sm">
                <ApperIcon name="MapPin" size={14} className="mr-1" />
                {candidate.location}
              </div>
            </div>
          </div>

          {/* Main Information */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {candidate.name}
                </h1>
                <h2 className="text-xl text-gray-600 mb-4">
                  {candidate.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={getExperienceColor(candidate.experience)}>
                    {candidate.experience}
                  </Badge>
                  <Badge variant="default">
                    {candidate.salaryRange}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row">
                <Button onClick={handleContact}>
                  <ApperIcon name="Mail" size={16} className="mr-2" />
                  Contact
                </Button>
                <Button variant="secondary" onClick={handleScheduleInterview}>
                  <ApperIcon name="Calendar" size={16} className="mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="info" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {candidate.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="User" size={20} className="mr-2" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Mail" size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{candidate.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Phone" size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{candidate.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Details */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Briefcase" size={20} className="mr-2" />
          Experience Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {candidate.yearsExperience}+
            </div>
            <p className="text-gray-500">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {candidate.projectsCompleted}
            </div>
            <p className="text-gray-500">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {candidate.certifications}
            </div>
            <p className="text-gray-500">Certifications</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CandidateProfile