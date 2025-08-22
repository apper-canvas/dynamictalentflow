import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import { candidateService } from "@/services/api/candidateService"

const AddCandidate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    experience: "Mid-level",
    availability: "Available",
    skills: [],
    salaryRange: "",
    photo: "",
    bio: "",
    yearsExperience: "",
    projectsCompleted: "",
    certifications: ""
  })
  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState({})

  const experienceLevels = ["Junior", "Mid-level", "Senior"]
  const availabilityOptions = ["Available", "Interviewing", "Not Available"]
  const salaryRanges = [
    "50k-70k",
    "70k-90k", 
    "90k-110k",
    "110k-130k",
    "130k+"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleAddSkill = () => {
    const skill = skillInput.trim()
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (formData.skills.length === 0) newErrors.skills = "At least one skill is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the form errors")
      return
    }

    try {
      setLoading(true)
      const candidate = await candidateService.create({
        ...formData,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        projectsCompleted: parseInt(formData.projectsCompleted) || 0,
        certifications: parseInt(formData.certifications) || 0
      })
      
      toast.success(`${candidate.name} has been added successfully!`)
      navigate("/candidates")
    } catch (error) {
      toast.error(error.message || "Failed to create candidate")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate("/candidates")
  }

  if (loading) return <Loading />

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBack}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            <span>Back to Candidates</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Candidate</h1>
            <p className="text-gray-600 mt-1">Create a new candidate profile</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="User" size={20} className="mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Senior Frontend Developer"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="candidate@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="San Francisco, CA"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                type="url"
                value={formData.photo}
                onChange={(e) => handleInputChange('photo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="https://example.com/photo.jpg (optional)"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="Briefcase" size={20} className="mr-2" />
            Professional Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability *
              </label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years Experience
              </label>
              <input
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projects Completed
              </label>
              <input
                type="number"
                min="0"
                value={formData.projectsCompleted}
                onChange={(e) => handleInputChange('projectsCompleted', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <input
                type="number"
                min="0"
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <select
                value={formData.salaryRange}
                onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                <option value="">Select salary range</option>
                {salaryRanges.map(range => (
                  <option key={range} value={range}>${range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="Code" size={20} className="mr-2" />
            Skills *
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Add a skill (e.g. React, JavaScript, etc.)"
                />
              </div>
              <Button
                type="button"
                onClick={handleAddSkill}
                disabled={!skillInput.trim()}
                size="md"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Add
              </Button>
            </div>
            
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
            
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="info"
                    className="flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-current hover:text-red-500 transition-colors"
                    >
                      <ApperIcon name="X" size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl card-shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="FileText" size={20} className="mr-2" />
            About
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
              placeholder="Tell us about this candidate's background, experience, and what makes them unique..."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            <ApperIcon name="UserPlus" size={16} className="mr-2" />
            Create Candidate
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default AddCandidate