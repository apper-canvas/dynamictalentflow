import dashboardMetricsData from "@/services/mockData/dashboardMetrics.json"
import activityItemsData from "@/services/mockData/activityItems.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardService = {
  async getMetrics() {
    await delay(300)
    return {
      ...dashboardMetricsData,
      lastUpdated: new Date().toISOString()
    }
  },

  async getActivityItems() {
    await delay(250)
    return [...activityItemsData].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  },

  async refreshMetrics() {
    await delay(400)
    const baseMetrics = dashboardMetricsData
    
    // Simulate small variations in metrics
    const variation = () => Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
    
    return {
      activeCandidates: Math.max(0, baseMetrics.activeCandidates + variation()),
      openPositions: Math.max(0, baseMetrics.openPositions + variation()),
      monthlyPlacements: Math.max(0, baseMetrics.monthlyPlacements + Math.floor(Math.random() * 2)),
      successRate: Math.min(100, Math.max(0, baseMetrics.successRate + variation())),
      lastUpdated: new Date().toISOString()
    }
  }
}