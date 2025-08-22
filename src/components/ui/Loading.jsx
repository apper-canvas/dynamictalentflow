import { motion } from "framer-motion"

const Loading = ({ variant = "default" }) => {
  if (variant === "metrics") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 card-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === "activity") {
    return (
      <div className="bg-white rounded-xl card-shadow">
        <div className="p-6 border-b border-gray-100">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default Loading