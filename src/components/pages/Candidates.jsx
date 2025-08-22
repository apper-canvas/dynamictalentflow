import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import CandidateCard from "@/components/molecules/CandidateCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { candidateService } from "@/services/api/candidateService"

const Candidates = () => {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState([])
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    skills: [],
    experience: [],
    availability: [],
    location: [],
    salaryRange: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [filterOptions, setFilterOptions] = useState({})

  const loadCandidates = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await candidateService.getAll()
      const options = candidateService.getFilterOptions()
      setCandidates(data)
      setFilteredCandidates(data)
      setFilterOptions(options)
      toast.success(`Loaded ${data.length} candidates`)
    } catch (err) {
      setError("Failed to load candidates")
    } finally {
      setLoading(false)
    }
  }

  const performSearch = async () => {
    try {
      const results = await candidateService.search(searchQuery, filters)
      setFilteredCandidates(results)
    } catch (err) {
      toast.error("Search failed")
    }
  }

  useEffect(() => {
    loadCandidates()
  }, [])

  useEffect(() => {
    performSearch()
  }, [searchQuery, filters])

const handleAddNewCandidate = () => {
    navigate("/candidates/new")
  }

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      experience: [],
      availability: [],
      location: [],
      salaryRange: []
    })
    setSearchQuery("")
    toast.success("All filters cleared")
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).flat().length
  }

  if (loading) return <Loading />

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={loadCandidates}
      />
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidate Directory</h1>
          <p className="text-gray-600 mt-1">
            Discover and connect with top talent for your organization
          </p>
        </div>
        <Button onClick={handleAddNewCandidate}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add New Candidate
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl card-shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <ApperIcon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search candidates by name, title, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Filter" size={16} />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <Badge variant="primary" size="sm">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            className="lg:w-1/4 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl card-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-sm"
                >
                  Clear All
                </Button>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.skills?.slice(0, 15).map(skill => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={(e) => handleFilterChange('skills', skill, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {filterOptions.experience?.map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.experience.includes(level)}
                        onChange={(e) => handleFilterChange('experience', level, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                <div className="space-y-2">
                  {filterOptions.availability?.map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.availability.includes(status)}
                        onChange={(e) => handleFilterChange('availability', status, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Salary Range</h4>
                <div className="space-y-2">
                  {filterOptions.salaryRange?.map(range => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.salaryRange.includes(range)}
                        onChange={(e) => handleFilterChange('salaryRange', range, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">${range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        <div className={showFilters ? "lg:w-3/4" : "w-full"}>
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {filteredCandidates.length} Candidates Found
              </h3>
              {(searchQuery || getActiveFilterCount() > 0) && (
                <Badge variant="info">
                  {searchQuery ? `"${searchQuery}"` : 'Filtered'}
                </Badge>
              )}
            </div>
          </div>

          {/* Candidates Grid */}
          {filteredCandidates.length === 0 ? (
            <Empty
              title="No candidates found"
              description="Try adjusting your search terms or filters to find more candidates."
              icon="Users"
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.Id}
                  candidate={candidate}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Candidates