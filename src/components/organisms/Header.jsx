import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import NavItem from "@/components/molecules/NavItem";
import Button from "@/components/atoms/Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const navigationItems = [
    { to: "/", icon: "BarChart3", label: "Dashboard" },
    { to: "/candidates", icon: "Users", label: "Candidates" },
    { to: "/jobs", icon: "Briefcase", label: "Jobs" },
    { to: "/companies", icon: "Building2", label: "Companies" },
    { to: "/analytics", icon: "PieChart", label: "Analytics" }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Zap" className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gradient">TalentFlow
                                      </h1>
                </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
                {navigationItems.map(
                    item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
                )}
            </nav>
            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && user && <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Welcome, {user.firstName || user.name || "User"}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="text-gray-600 hover:text-gray-900">
                        <ApperIcon name="LogOut" size={16} className="mr-2" />Logout
                                        </Button>
                </div>}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
    {/* Mobile Navigation */}
    {isMobileMenuOpen && <motion.div
        className="md:hidden py-4 border-t border-gray-200"
        initial={{
            opacity: 0,
            height: 0
        }}
        animate={{
            opacity: 1,
            height: "auto"
        }}
        exit={{
            opacity: 0,
            height: 0
        }}
        transition={{
            duration: 0.2
        }}>
        <nav className="flex flex-col space-y-1">
            {navigationItems.map(
                item => <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
            )}
            {isAuthenticated && user && <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="px-4 py-2">
                    <span className="text-sm text-gray-600">Welcome, {user.firstName || user.name || "User"}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center">
                    <ApperIcon name="LogOut" size={16} className="mr-2" />Logout
                                      </button>
            </div>}
        </nav>
    </motion.div>}
</header>
  )
}

export default Header