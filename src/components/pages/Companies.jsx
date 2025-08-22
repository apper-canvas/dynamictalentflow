import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import CompanyCard from "@/components/molecules/CompanyCard"
import { getCompanies, searchCompanies } from "@/services/api/companyService"

const Companies = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true)
        const data = await getCompanies()
        setCompanies(data)
        setFilteredCompanies(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    const filtered = searchCompanies(searchTerm, {
      industry: selectedIndustry,
      relationshipStatus: selectedStatus
    })
    setFilteredCompanies(filtered)
  }, [searchTerm, selectedIndustry, selectedStatus])

  const handleAddNewClient = () => {
    toast.info("Add New Client functionality coming soon")
  }

  const handleImportCompanies = () => {
    toast.info("Import Companies functionality coming soon")
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("")
    setSelectedStatus("")
  }

  const uniqueIndustries = [...new Set(companies.map(c => c.industry))].sort()
  const relationshipStatuses = ["Active", "Opportunity", "Needs Attention"]

  const getStatusCount = (status) => {
    return companies.filter(c => c.relationshipStatus === status).length
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Directory</h1>
          <p className="text-gray-600">Manage client relationships and hiring insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleImportCompanies}>
            <ApperIcon name="Upload" size={16} className="mr-2" />
            Import Companies
          </Button>
          <Button variant="primary" onClick={handleAddNewClient}>
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ApperIcon name="Building2" size={20} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Companies</p>
              <p className="text-2xl font-semibold text-gray-900">{companies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{getStatusCount("Active")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ApperIcon name="Star" size={20} className="text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Opportunities</p>
              <p className="text-2xl font-semibold text-gray-900">{getStatusCount("Opportunity")}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg card-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ApperIcon name="AlertTriangle" size={20} className="text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Need Attention</p>
              <p className="text-2xl font-semibold text-gray-900">{getStatusCount("Needs Attention")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies, industries, contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Industry Filter */}
          <div className="min-w-0 lg:w-48">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Industries</option>
              {uniqueIndustries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="min-w-0 lg:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Statuses</option>
              {relationshipStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedIndustry || selectedStatus) && (
            <Button variant="ghost" onClick={handleClearFilters} size="sm">
              <ApperIcon name="X" size={16} className="mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedIndustry || selectedStatus) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            {searchTerm && (
              <Badge variant="info" className="flex items-center">
                Search: "{searchTerm}"
                <ApperIcon 
                  name="X" 
                  size={12} 
                  className="ml-1 cursor-pointer hover:text-blue-900" 
                  onClick={() => setSearchTerm("")}
                />
              </Badge>
            )}
            {selectedIndustry && (
              <Badge variant="info" className="flex items-center">
                Industry: {selectedIndustry}
                <ApperIcon 
                  name="X" 
                  size={12} 
                  className="ml-1 cursor-pointer hover:text-blue-900" 
                  onClick={() => setSelectedIndustry("")}
                />
              </Badge>
            )}
            {selectedStatus && (
              <Badge variant="info" className="flex items-center">
                Status: {selectedStatus}
                <ApperIcon 
                  name="X" 
                  size={12} 
                  className="ml-1 cursor-pointer hover:text-blue-900" 
                  onClick={() => setSelectedStatus("")}
                />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCompanies.length} of {companies.length} companies
        </p>
      </div>

      {/* Company Grid */}
      {filteredCompanies.length === 0 ? (
        <Empty 
          title="No companies found"
          description={searchTerm || selectedIndustry || selectedStatus ? 
            "Try adjusting your search or filters" : 
            "Get started by adding your first client company"
          }
          action={
            <Button variant="primary" onClick={handleAddNewClient}>
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add New Client
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company, index) => (
            <CompanyCard
              key={company.Id}
              company={company}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Companies