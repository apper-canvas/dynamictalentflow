import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import JobCard from "@/components/molecules/JobCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { getJobs, createJob } from "@/services/api/jobService"

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const statusOptions = ["All", "Open", "Filled", "On Hold"]

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const jobsData = await getJobs()
      setJobs(jobsData)
    } catch (err) {
      setError("Failed to load jobs")
      toast.error("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleJobUpdate = (updatedJob, deletedJobId) => {
    if (deletedJobId) {
      // Handle job deletion
      setJobs(prev => prev.filter(job => job.Id !== deletedJobId))
    } else if (updatedJob) {
      // Handle job update
      setJobs(prev => prev.map(job => 
        job.Id === updatedJob.Id ? updatedJob : job
      ))
    }
  }

  const handleCreateJob = async () => {
    try {
      const newJob = await createJob({
        title: "New Position",
        company: "Your Company",
        companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
        department: "Department",
        location: "Location",
        salaryRange: "$XX,XXX - $XX,XXX",
        type: "Full-time",
        status: "Open",
        description: "Job description",
        requirements: []
      })
      setJobs(prev => [newJob, ...prev])
      toast.success("New job created successfully")
    } catch (error) {
      toast.error("Failed to create job")
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "All" || job.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusCount = (status) => {
    if (status === "All") return jobs.length
    return jobs.filter(job => job.status === status).length
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadJobs} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Management
          </h1>
          <p className="text-gray-600">
            Manage job postings and track candidate matches
          </p>
        </div>
        <Button
          onClick={handleCreateJob}
          className="mt-4 sm:mt-0"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl card-shadow p-6 mb-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or department..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <motion.button
              key={status}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                statusFilter === status
                  ? 'bg-primary-100 text-primary-700 border-2 border-primary-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
              onClick={() => setStatusFilter(status)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{status}</span>
              <Badge variant="default" size="sm">
                {getStatusCount(status)}
              </Badge>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-white p-6 rounded-xl card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Briefcase" className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{getStatusCount("Open")}</p>
              <p className="text-sm text-gray-600">Open Positions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.applicantCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Applicants</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl card-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.matchCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Strong Matches</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <Empty
          icon="Briefcase"
          title="No jobs found"
          description={
            searchQuery || statusFilter !== "All"
              ? "Try adjusting your search or filters"
              : "Get started by posting your first job"
          }
          action={
            searchQuery || statusFilter !== "All" ? (
              <Button 
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("All")
                }}
                variant="secondary"
              >
                Clear Filters
              </Button>
            ) : (
              <Button onClick={handleCreateJob}>
                <ApperIcon name="Plus" size={16} className="mr-2" />
                Post New Job
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job.Id}
              job={job}
              index={index}
              onJobUpdate={handleJobUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs