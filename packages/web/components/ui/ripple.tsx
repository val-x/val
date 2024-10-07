import React from "react"
import { motion } from "framer-motion"

export const Ripple = ({ color = "#2196F3" }) => {
  return (
    <div className="relative w-full h-full">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            border: `2px solid ${color}`,
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  )
}