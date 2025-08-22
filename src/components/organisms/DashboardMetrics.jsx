import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import MetricCard from "@/components/molecules/MetricCard"
import RefreshIndicator from "@/components/molecules/RefreshIndicator"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { dashboardService } from "@/services/api/dashboardService"

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    activeCandidates: 0,
    openPositions: 0,
    monthlyPlacements: 0,
    successRate: 0,
    lastUpdated: new Date().toISOString()
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const loadMetrics = async () => {
    try {
      setError("")
      const data = await dashboardService.getMetrics()
      setMetrics(data)
    } catch (err) {
      setError("Failed to load dashboard metrics")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      setError("")
      const data = await dashboardService.refreshMetrics()
      setMetrics(data)
      toast.success("Dashboard metrics updated successfully!")
    } catch (err) {
      setError("Failed to refresh metrics")
      toast.error("Failed to refresh metrics")
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadMetrics()
  }, [])

  if (loading) return <Loading variant="metrics" />

  if (error && !metrics.activeCandidates) {
    return (
      <Error 
        message={error}
        onRetry={loadMetrics}
      />
    )
  }

  const metricCards = [
    {
      title: "Active Candidates",
      value: metrics.activeCandidates,
      icon: "Users",
      trend: "up",
      trendValue: "+5",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Open Positions",
      value: metrics.openPositions,
      icon: "Briefcase",
      trend: "up",
      trendValue: "+2",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      title: "Placements This Month",
      value: metrics.monthlyPlacements,
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+3",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate}%`,
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+2%",
      gradient: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Monitor your recruitment pipeline performance
          </p>
        </div>
        <RefreshIndicator
          lastUpdated={metrics.lastUpdated}
          onRefresh={handleRefresh}
          isLoading={refreshing}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metricCards.map((card, index) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            trend={card.trend}
            trendValue={card.trendValue}
            gradient={card.gradient}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardMetrics