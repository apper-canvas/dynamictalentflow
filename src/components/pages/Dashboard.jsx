import DashboardMetrics from "@/components/organisms/DashboardMetrics"
import ActivityFeed from "@/components/organisms/ActivityFeed"

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardMetrics />
      <ActivityFeed />
    </div>
  )
}

export default Dashboard