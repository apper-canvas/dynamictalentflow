const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const getJobs = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title_c" } },
        { field: { Name: "company_c" } },
        { field: { Name: "company_logo_c" } },
        { field: { Name: "department_c" } },
        { field: { Name: "location_c" } },
        { field: { Name: "salary_range_c" } },
        { field: { Name: "type_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "posted_date_c" } },
        { field: { Name: "applicant_count_c" } },
        { field: { Name: "match_count_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "requirements_c" } },
        { field: { Name: "matches_c" } }
      ],
      orderBy: [{ fieldName: "posted_date_c", sorttype: "DESC" }]
    }

    const response = await apperClient.fetchRecords("job_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    return response.data || []
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching jobs:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const getJobById = async (id) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title_c" } },
        { field: { Name: "company_c" } },
        { field: { Name: "company_logo_c" } },
        { field: { Name: "department_c" } },
        { field: { Name: "location_c" } },
        { field: { Name: "salary_range_c" } },
        { field: { Name: "type_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "posted_date_c" } },
        { field: { Name: "applicant_count_c" } },
        { field: { Name: "match_count_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "requirements_c" } },
        { field: { Name: "matches_c" } }
      ]
    }

    const response = await apperClient.getRecordById("job_c", parseInt(id), params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }

    return response.data || null
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching job with ID ${id}:`, error.response.data.message)
    } else {
      console.error(error)
    }
    return null
  }
}

export const createJob = async (jobData) => {
  try {
    const data = {
      Name: jobData.title?.trim(),
      title_c: jobData.title?.trim(),
      company_c: jobData.company?.trim(),
      company_logo_c: jobData.companyLogo || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
      department_c: jobData.department?.trim(),
      location_c: jobData.location?.trim(),
      salary_range_c: jobData.salaryRange?.trim(),
      type_c: jobData.type || "Full-time",
      status_c: jobData.status || "Open",
      posted_date_c: new Date().toISOString().split('T')[0],
      applicant_count_c: jobData.applicantCount || 0,
      match_count_c: jobData.matchCount || 0,
      description_c: jobData.description?.trim(),
      requirements_c: Array.isArray(jobData.requirements) ? jobData.requirements.join(",") : (jobData.requirements || ""),
      matches_c: ""
    }

    const params = { records: [data] }
    const response = await apperClient.createRecord("job_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success)
      const failedRecords = response.results.filter(result => !result.success)
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create job ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            console.error(`${error.fieldLabel}: ${error}`)
          })
        })
      }
      
      return successfulRecords[0]?.data || null
    }
    
    return null
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error creating job:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const updateJob = async (id, jobData) => {
  try {
    const data = {
      ...jobData
    }

    const params = { records: [{ Id: parseInt(id), ...data }] }
    const response = await apperClient.updateRecord("job_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success)
      const failedUpdates = response.results.filter(result => !result.success)
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update job ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            console.error(`${error.fieldLabel}: ${error}`)
          })
        })
      }
      
      return successfulUpdates[0]?.data || null
    }
    
    return null
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error updating job:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const deleteJob = async (id) => {
  try {
    const params = { RecordIds: [parseInt(id)] }
    const response = await apperClient.deleteRecord("job_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success)
      const failedDeletions = response.results.filter(result => !result.success)
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete job ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
        failedDeletions.forEach(record => {
          if (record.message) console.error(record.message)
        })
      }
      
      return successfulDeletions.length > 0
    }
    
    return false
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error deleting job:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const getJobsByCompany = async (companyName) => {
  if (!companyName) return []
  
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "title_c" } },
        { field: { Name: "company_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "posted_date_c" } }
      ],
      where: [
        {
          FieldName: "company_c",
          Operator: "ExactMatch",
          Values: [companyName]
        }
      ]
    }

    const response = await apperClient.fetchRecords("job_c", params)
    
    if (!response.success) {
      console.error(response.message)
      return []
    }

    return response.data || []
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching jobs by company:", error.response.data.message)
    } else {
      console.error(error)
    }
    return []
  }
}