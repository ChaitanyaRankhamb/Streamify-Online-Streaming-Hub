"use client"

import React from 'react'
import { motion } from "framer-motion"

function StreamifyHeroSection() {
  return (
    <div className='bg-background min-h-screen overflow-hidden relative'>
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, var(--primary)20 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, var(--secondary)20 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, var(--accent)20 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, var(--primary)20 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      />


      <h1>my name is chiatu</h1>

    </div>
  )
}

export default StreamifyHeroSection