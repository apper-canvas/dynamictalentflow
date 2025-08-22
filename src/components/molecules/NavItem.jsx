import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const NavItem = ({ to, icon, label, isActive, disabled = false }) => {
  if (disabled) {
    return (
      <div className="relative px-4 py-3 text-gray-400 cursor-not-allowed opacity-60">
        <div className="flex items-center space-x-2">
          <ApperIcon name={icon} className="w-5 h-5" />
          <span className="font-medium">{label}</span>
        </div>
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "relative px-4 py-3 font-medium transition-all duration-200 hover:text-primary-600",
          isActive ? "text-primary-600" : "text-gray-700"
        )
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center space-x-2">
            <ApperIcon name={icon} className="w-5 h-5" />
            <span>{label}</span>
          </div>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-500"
              layoutId="activeTab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavItem