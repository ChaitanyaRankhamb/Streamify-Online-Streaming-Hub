"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center mb-10 w-20 h-20 max-sm:w-10 max-sm:h-10 max-md:w-14 max-md:h-14 max-lg:w-18 max-lg:h-18">
      <motion.svg
        viewBox="0 0 100 100"
        className="animate-spin" // Tailwind's built-in spin animation
        transition={{
          duration: 4
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#e5e7eb" // gray background circle
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#3b82f6" // blue moving part
          strokeWidth="8"
          fill="none"
          strokeDasharray="125.6" // circumference of circle ≈ 2 * π * r
          strokeDashoffset="94.2" // ~3/4 of the circumference
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
