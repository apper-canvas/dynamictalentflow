import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { toast } from "react-toastify"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getCompanyById, updateCompany } from "@/services/api/companyService"

const CompanyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true)
        const companyData = await getCompanyById(id)
        if (!companyData) {
          setError("Company not found")
        } else {
          setCompany(companyData)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [id])

  const handleStatusUpdate = async (newStatus) => {
    try {
      const updatedCompany = await updateCompany(company.Id, { relationshipStatus: newStatus })
      setCompany(updatedCompany)
      toast.success(`Company status updated to ${newStatus}`)
    } catch (error) {
      toast.error("Failed to update company status")
    }
  }

  const handleContact = () => {
    toast.info(`Contacting ${company.primaryContact.name} at ${company.primaryContact.email}`)
  }

  const handleEdit = () => {
    toast.info("Edit company functionality coming soon")
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

  if (loading) return <Loading />
  if (error) return <Error message={error} />
  if (!company) return <Error message="Company not found" />

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/companies')}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600">Manage client relationship and hiring insights</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={handleEdit}>
            <ApperIcon name="Edit" size={16} className="mr-2" />
            Edit Profile
          </Button>
          <Button variant="primary" onClick={handleContact}>
            <ApperIcon name="Mail" size={16} className="mr-2" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Info Card */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <div className="flex items-start space-x-6 mb-6">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{company.name}</h2>
                    <p className="text-gray-600">{company.industry}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(company.relationshipStatus)} className="mb-2">
                      {company.relationshipStatus}
                    </Badge>
                    <div className={`flex items-center px-3 py-1 rounded-full border text-sm ${getHealthColor(company.relationshipHealth)}`}>
                      <ApperIcon name="TrendingUp" size={14} className="mr-1" />
                      <span className="capitalize">{company.relationshipHealth}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="Users" size={16} className="mr-2" />
                    <span>{company.employeeCount.toLocaleString()} employees</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="MapPin" size={16} className="mr-2" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="Globe" size={16} className="mr-2" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {company.website}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="Calendar" size={16} className="mr-2" />
                    <span>Last contact {formatDistanceToNow(new Date(company.lastInteraction), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{company.description}</p>

            {/* Status Actions */}
            <div className="flex flex-wrap gap-2">
              {company.relationshipStatus !== "Active" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusUpdate("Active")}
                  className="text-green-600 hover:text-green-700"
                >
                  <ApperIcon name="CheckCircle" size={14} className="mr-1" />
                  Mark Active
                </Button>
              )}
              {company.relationshipStatus !== "Opportunity" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusUpdate("Opportunity")}
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  <ApperIcon name="Star" size={14} className="mr-1" />
                  Mark Opportunity
                </Button>
              )}
              {company.relationshipStatus !== "Needs Attention" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusUpdate("Needs Attention")}
                  className="text-red-600 hover:text-red-700"
                >
                  <ApperIcon name="AlertTriangle" size={14} className="mr-1" />
                  Needs Attention
                </Button>
              )}
            </div>
          </div>

          {/* Hiring Preferences */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {company.hiringPreferences.map((skill, index) => (
                <Badge key={index} variant="info" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">
                  {company.openPositions}
                </div>
                <div className="text-sm text-blue-600 font-medium">Open Positions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-600">
                  {company.successfulPlacements}
                </div>
                <div className="text-sm text-green-600 font-medium">Successful Placements</div>
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">{company.primaryContact.name}</p>
                <p className="text-sm text-gray-600">{company.primaryContact.title}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <ApperIcon name="Mail" size={14} className="mr-2" />
                  <a href={`mailto:${company.primaryContact.email}`} className="text-blue-600 hover:underline">
                    {company.primaryContact.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ApperIcon name="Phone" size={14} className="mr-2" />
                  <a href={`tel:${company.primaryContact.phone}`} className="text-blue-600 hover:underline">
                    {company.primaryContact.phone}
                  </a>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={handleContact}
              >
                <ApperIcon name="MessageSquare" size={14} className="mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CompanyDetail