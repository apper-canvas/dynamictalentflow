import candidatesData from "@/services/mockData/candidates.json";
import { dashboardService } from "@/services/api/dashboardService";
import React from "react";
import Error from "@/components/ui/Error";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const candidateService = {
  async getAll() {
    await delay(300)
    return [...candidatesData].sort((a, b) => a.name.localeCompare(b.name))
  },

  async getById(id) {
    await delay(200)
    const candidate = candidatesData.find(c => c.Id === parseInt(id))
    return candidate ? { ...candidate } : null
  },

  async search(query, filters = {}) {
    await delay(250)
    let results = [...candidatesData]

    // Text search across name, title, skills
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      results = results.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm) ||
        candidate.title.toLowerCase().includes(searchTerm) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
        candidate.location.toLowerCase().includes(searchTerm)
      )
    }

    // Apply filters
    if (filters.skills && filters.skills.length > 0) {
      results = results.filter(candidate =>
        filters.skills.some(skill => 
          candidate.skills.some(candidateSkill => 
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      )
    }

    if (filters.experience && filters.experience.length > 0) {
      results = results.filter(candidate =>
        filters.experience.includes(candidate.experience)
      )
    }

    if (filters.availability && filters.availability.length > 0) {
      results = results.filter(candidate =>
        filters.availability.includes(candidate.availability)
      )
    }

    if (filters.location && filters.location.length > 0) {
      results = results.filter(candidate =>
        filters.location.some(loc => 
          candidate.location.toLowerCase().includes(loc.toLowerCase())
        )
      )
    }

    if (filters.salaryRange && filters.salaryRange.length > 0) {
      results = results.filter(candidate => {
        const candidateRange = candidate.salaryRange
        return filters.salaryRange.some(range => 
          candidateRange.includes(range) || range.includes(candidateRange.split('-')[0].replace(/[^0-9]/g, ''))
        )
      })
    }

    return results.sort((a, b) => a.name.localeCompare(b.name))
  },

  async logCandidateView(candidateId, candidateName) {
    // Add candidate view activity to dashboard
    const activity = {
      Id: Date.now(), // Simple ID generation for mock
      type: "candidate_view",
      title: `Viewed ${candidateName}'s profile`,
      description: `Candidate profile accessed for review and evaluation`,
      timestamp: new Date().toISOString(),
      status: "viewed"
    }

    // This would normally be sent to the backend
    // For now, we'll just simulate the API call
    await delay(100)
    return activity
  },

  getFilterOptions() {
    return {
      skills: [...new Set(candidatesData.flatMap(c => c.skills))].sort(),
      experience: [...new Set(candidatesData.map(c => c.experience))].sort(),
      availability: [...new Set(candidatesData.map(c => c.availability))].sort(),
      location: [...new Set(candidatesData.map(c => c.location.split(',')[1]?.trim() || c.location))].sort(),
salaryRange: [
        "50k-70k",
        "70k-90k", 
        "90k-110k",
        "110k-130k",
        "130k+"
      ]
    }
  },

  async create(candidateData) {
    await delay(400)
    
    // Validate required fields
    const requiredFields = ['name', 'title', 'email', 'phone', 'location', 'experience', 'availability']
    for (const field of requiredFields) {
      if (!candidateData[field] || candidateData[field].toString().trim() === '') {
        throw new Error(`${field} is required`)
      }
    }

    // Generate new ID (highest existing ID + 1)
    const maxId = Math.max(...candidatesData.map(c => c.Id), 0)
    const newId = maxId + 1

    // Create new candidate with defaults
    const newCandidate = {
      Id: newId,
      name: candidateData.name.trim(),
      title: candidateData.title.trim(),
      email: candidateData.email.trim().toLowerCase(),
      phone: candidateData.phone.trim(),
      location: candidateData.location.trim(),
      experience: candidateData.experience,
      availability: candidateData.availability,
      skills: candidateData.skills || [],
      salaryRange: candidateData.salaryRange || "Not specified",
      photo: candidateData.photo || "https://images.unsplash.com/photo-1494790108755-2616b612b1e6?w=400&h=400&fit=crop&crop=face",
      bio: candidateData.bio || "Professional seeking new opportunities.",
      yearsExperience: candidateData.yearsExperience || 0,
      projectsCompleted: candidateData.projectsCompleted || 0,
      certifications: candidateData.certifications || 0
    }

    // Simulate adding to data store
    candidatesData.push(newCandidate)
    
    return { ...newCandidate }
  }
}