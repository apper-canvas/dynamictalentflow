const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const candidateService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "photo_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "experience_c" } },
          { field: { Name: "years_experience_c" } },
          { field: { Name: "availability_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "salary_range_c" } },
          { field: { Name: "bio_c" } },
          { field: { Name: "projects_completed_c" } },
          { field: { Name: "certifications_c" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
      }

      const response = await apperClient.fetchRecords("candidate_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching candidates:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "photo_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "experience_c" } },
          { field: { Name: "years_experience_c" } },
          { field: { Name: "availability_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "salary_range_c" } },
          { field: { Name: "bio_c" } },
          { field: { Name: "projects_completed_c" } },
          { field: { Name: "certifications_c" } }
        ]
      }

      const response = await apperClient.getRecordById("candidate_c", parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }

      return response.data || null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching candidate with ID ${id}:`, error.response.data.message)
      } else {
        console.error(error)
      }
      return null
    }
  },

  async search(query, filters = {}) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "photo_c" } },
          { field: { Name: "skills_c" } },
          { field: { Name: "experience_c" } },
          { field: { Name: "years_experience_c" } },
          { field: { Name: "availability_c" } },
          { field: { Name: "location_c" } },
          { field: { Name: "salary_range_c" } },
          { field: { Name: "bio_c" } },
          { field: { Name: "projects_completed_c" } },
          { field: { Name: "certifications_c" } }
        ],
        where: [],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
      }

      if (query.trim()) {
        params.where.push({
          FieldName: "Name",
          Operator: "Contains",
          Values: [query.trim()]
        })
      }

      if (filters.skills && filters.skills.length > 0) {
        params.where.push({
          FieldName: "skills_c",
          Operator: "Contains",
          Values: filters.skills
        })
      }

      if (filters.experience && filters.experience.length > 0) {
        params.where.push({
          FieldName: "experience_c",
          Operator: "ExactMatch",
          Values: filters.experience
        })
      }

      if (filters.availability && filters.availability.length > 0) {
        params.where.push({
          FieldName: "availability_c",
          Operator: "ExactMatch",
          Values: filters.availability
        })
      }

      const response = await apperClient.fetchRecords("candidate_c", params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching candidates:", error.response.data.message)
      } else {
        console.error(error)
      }
      return []
    }
  },

  async logCandidateView(candidateId, candidateName) {
    try {
      const activityData = {
        Name: `Viewed ${candidateName}'s profile`,
        type_c: "candidate_view",
        title_c: `Viewed ${candidateName}'s profile`,
        description_c: `Candidate profile accessed for review and evaluation`,
        timestamp_c: new Date().toISOString(),
        status_c: "viewed"
      }

      const params = { records: [activityData] }
      const response = await apperClient.createRecord("activity_item_c", params)
      
      if (!response.success) {
        console.error(response.message)
      }

      return response.data?.[0] || null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error logging candidate view:", error.response.data.message)
      } else {
        console.error(error)
      }
    }
  },

  getFilterOptions() {
    return {
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Product Strategy", "Agile", "Analytics", "User Research", "Roadmapping", "Figma", "Prototyping", "Design Systems", "Accessibility", "Kubernetes", "Docker", "Terraform", "CI/CD", "Machine Learning", "SQL", "Tableau", "Statistics"],
      experience: ["Senior", "Mid-level", "Junior"],
      availability: ["Available", "Interviewing", "Not Available"],
      location: ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA"],
      salaryRange: ["50k-70k", "70k-90k", "90k-110k", "110k-130k", "130k+"]
    }
  },

  async create(candidateData) {
    try {
const data = {
        Name: candidateData.name?.trim(),
        title_c: candidateData.title?.trim(),
        email_c: candidateData.email?.trim().toLowerCase(),
        phone_c: candidateData.phone?.trim(),
        photo_c: candidateData.photo || "https://images.unsplash.com/photo-1494790108755-2616b612b1e6?w=400&h=400&fit=crop&crop=face",
        skills_c: candidateData.skills || [],
        experience_c: candidateData.experience,
        years_experience_c: parseInt(candidateData.yearsExperience) || 0,
        availability_c: candidateData.availability,
        location_c: candidateData.location?.trim(),
        salary_range_c: candidateData.salaryRange || "Not specified",
        bio_c: candidateData.bio || "Professional seeking new opportunities.",
        projects_completed_c: parseInt(candidateData.projectsCompleted) || 0,
        certifications_c: parseInt(candidateData.certifications) || 0
      }

      const params = { records: [data] }
      const response = await apperClient.createRecord("candidate_c", params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
if (failedRecords.length > 0) {
          console.error(`Failed to create candidate ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message || error}`)
            })
            if (record.message) {
              console.error(`Record error: ${record.message}`)
            }
          })
          // Throw the first error to surface it to the UI
          const firstError = failedRecords[0]
          if (firstError.errors && firstError.errors.length > 0) {
            throw new Error(`${firstError.errors[0].fieldLabel}: ${firstError.errors[0].message || firstError.errors[0]}`)
          } else if (firstError.message) {
            throw new Error(firstError.message)
          }
        }
        
        return successfulRecords[0]?.data || null
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating candidate:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw error
    }
  }
}