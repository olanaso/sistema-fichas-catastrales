"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate minimum loading time of 1 second
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex items-center gap-1 sm:gap-2"
        >
          <span className="text-4xl sm:text-5xl lg:text-6xl font-semibold bg-white text-black px-3 sm:px-4">
            IDEAS
          </span>
          <span className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white">SAC</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
