const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const getCompanies = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "logo_c" } },
        { field: { Name: "industry_c" } },
        { field: { Name: "employee_count_c" } },
        { field: { Name: "relationship_status_c" } },
        { field: { Name: "open_positions_c" } },
        { field: { Name: "successful_placements_c" } },
        { field: { Name: "last_interaction_c" } },
        { field: { Name: "primary_contact_name_c" } },
        { field: { Name: "primary_contact_title_c" } },
        { field: { Name: "primary_contact_email_c" } },
        { field: { Name: "primary_contact_phone_c" } },
        { field: { Name: "location_c" } },
        { field: { Name: "website_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "hiring_preferences_c" } },
        { field: { Name: "relationship_health_c" } }
      ],
      orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
    }

    const response = await apperClient.fetchRecords("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    return response.data || []
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching companies:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const getCompanyById = async (id) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "logo_c" } },
        { field: { Name: "industry_c" } },
        { field: { Name: "employee_count_c" } },
        { field: { Name: "relationship_status_c" } },
        { field: { Name: "open_positions_c" } },
        { field: { Name: "successful_placements_c" } },
        { field: { Name: "last_interaction_c" } },
        { field: { Name: "primary_contact_name_c" } },
        { field: { Name: "primary_contact_title_c" } },
        { field: { Name: "primary_contact_email_c" } },
        { field: { Name: "primary_contact_phone_c" } },
        { field: { Name: "location_c" } },
        { field: { Name: "website_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "hiring_preferences_c" } },
        { field: { Name: "relationship_health_c" } }
      ]
    }

    const response = await apperClient.getRecordById("company_c", parseInt(id), params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }

    return response.data || null
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching company with ID ${id}:`, error.response.data.message)
    } else {
      console.error(error)
    }
    return null
  }
}

export const createCompany = async (companyData) => {
  try {
    const data = {
      Name: companyData.name?.trim(),
      logo_c: companyData.logo || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=faces",
      industry_c: companyData.industry?.trim(),
      employee_count_c: parseInt(companyData.employeeCount) || 0,
      relationship_status_c: companyData.relationshipStatus || "Opportunity",
      open_positions_c: parseInt(companyData.openPositions) || 0,
      successful_placements_c: parseInt(companyData.successfulPlacements) || 0,
      last_interaction_c: companyData.lastInteraction || new Date().toISOString().split('T')[0],
      primary_contact_name_c: companyData.primaryContact?.name?.trim() || "",
      primary_contact_title_c: companyData.primaryContact?.title?.trim() || "",
      primary_contact_email_c: companyData.primaryContact?.email?.trim() || "",
      primary_contact_phone_c: companyData.primaryContact?.phone?.trim() || "",
      location_c: companyData.location?.trim(),
      website_c: companyData.website?.trim(),
      description_c: companyData.description?.trim(),
      hiring_preferences_c: Array.isArray(companyData.hiringPreferences) ? companyData.hiringPreferences.join(",") : (companyData.hiringPreferences || ""),
      relationship_health_c: companyData.relationshipHealth || "good"
    }

    const params = { records: [data] }
    const response = await apperClient.createRecord("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success)
      const failedRecords = response.results.filter(result => !result.success)
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create company ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
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
      console.error("Error creating company:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const updateCompany = async (id, companyData) => {
  try {
    const data = {
      ...companyData,
      last_interaction_c: new Date().toISOString().split('T')[0]
    }

    const params = { records: [{ Id: parseInt(id), ...data }] }
    const response = await apperClient.updateRecord("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success)
      const failedUpdates = response.results.filter(result => !result.success)
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update company ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
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
      console.error("Error updating company:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const deleteCompany = async (id) => {
  try {
    const params = { RecordIds: [parseInt(id)] }
    const response = await apperClient.deleteRecord("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success)
      const failedDeletions = response.results.filter(result => !result.success)
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete company ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
        failedDeletions.forEach(record => {
          if (record.message) console.error(record.message)
        })
      }
      
      return successfulDeletions.length > 0
    }
    
    return false
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error deleting company:", error.response.data.message)
    } else {
      console.error(error)
    }
    throw error
  }
}

export const searchCompanies = async (searchTerm, filters = {}) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "logo_c" } },
        { field: { Name: "industry_c" } },
        { field: { Name: "employee_count_c" } },
        { field: { Name: "relationship_status_c" } },
        { field: { Name: "open_positions_c" } },
        { field: { Name: "successful_placements_c" } },
        { field: { Name: "last_interaction_c" } },
        { field: { Name: "primary_contact_name_c" } },
        { field: { Name: "primary_contact_title_c" } },
        { field: { Name: "primary_contact_email_c" } },
        { field: { Name: "primary_contact_phone_c" } },
        { field: { Name: "location_c" } },
        { field: { Name: "website_c" } },
        { field: { Name: "description_c" } },
        { field: { Name: "hiring_preferences_c" } },
        { field: { Name: "relationship_health_c" } }
      ],
      where: [],
      orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
    }

    if (searchTerm) {
      params.where.push({
        FieldName: "Name",
        Operator: "Contains",
        Values: [searchTerm.trim()]
      })
    }

    if (filters.industry) {
      params.where.push({
        FieldName: "industry_c",
        Operator: "ExactMatch",
        Values: [filters.industry]
      })
    }

    if (filters.relationshipStatus) {
      params.where.push({
        FieldName: "relationship_status_c",
        Operator: "ExactMatch",
        Values: [filters.relationshipStatus]
      })
    }

    const response = await apperClient.fetchRecords("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      return []
    }

    return response.data || []
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error searching companies:", error.response.data.message)
    } else {
      console.error(error)
    }
    return []
  }
}

export const getCompanyByName = async (name) => {
  if (!name) return null
  
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "logo_c" } },
        { field: { Name: "industry_c" } },
        { field: { Name: "open_positions_c" } },
        { field: { Name: "successful_placements_c" } }
      ],
      where: [
        {
          FieldName: "Name",
          Operator: "ExactMatch",
          Values: [name]
        }
      ]
    }

    const response = await apperClient.fetchRecords("company_c", params)
    
    if (!response.success) {
      console.error(response.message)
      return null
    }

    return response.data?.[0] || null
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching company by name:", error.response.data.message)
    } else {
      console.error(error)
    }
    return null
  }
}

export const getCompanyJobStats = async (companyName) => {
  const company = await getCompanyByName(companyName)
  if (!company) return { openJobs: 0, totalPlacements: 0, placementRate: 0 }
  
  const placementRate = company.open_positions_c > 0 
    ? Math.round((company.successful_placements_c / (company.successful_placements_c + company.open_positions_c)) * 100)
    : company.successful_placements_c > 0 ? 100 : 0
    
  return {
    openJobs: company.open_positions_c || 0,
    totalPlacements: company.successful_placements_c || 0,
    placementRate: placementRate
  }
}