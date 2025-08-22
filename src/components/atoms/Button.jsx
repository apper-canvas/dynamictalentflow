import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import { motion } from "framer-motion"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    danger: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg hover:shadow-xl"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <motion.button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button