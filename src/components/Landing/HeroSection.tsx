import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Loader from './Loader'
import { Button } from '../ui/button'

function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  
    useEffect(() => {
      const checkDark = () =>
        setIsDark(document.documentElement.classList.contains("dark"));
      checkDark();
  
      // Optional: listen for changes if you have a theme toggle
      const observer = new MutationObserver(checkDark);
      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
    }, []);
  
  return (
    <section className="relative flex flex-col items-center justify-center h-screen px-6 text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-20 blur-3xl"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="box bg-teal-400"
        initial={{
          x: -200, y: -30
        }}
        animate={{
          x: -200, y: -30,
          scale: [0.6, 1, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Text on top */}
      <h1 className="text-9xl max-sm:text-6xl max-md:text-7xl max-lg:text-8xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 via-teal-300 to-violet-800">Streamify</h1>

      <motion.div
        className="box-2 bg-teal-400 "
        initial={{
          x: 300, y: -40
        }}
        animate={{
          x: 300, y: -40,
          scale: [0.6, 1, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <Loader />

      <motion.h1
        className="text-5xl max-sm:text-2xl max-md:text-3xl max-lg:text-4xl max-sm:w-[300px] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        All Your Entertainment. One Stream.
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl mb-8 max-w-xl max-sm:text-sm max-md:text-md max-sm:w-sm max-md:w-lg "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Discover the latest movies, hottest tracks, and captivating podcasts — all in one place.
      </motion.p>
      <div className="flex flex-col md:flex-row gap-4">
        <Button className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white">
          Start Free Trial
        </Button>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700">
          Explore Library
        </Button>
      </div>
    </section>
  )
}

export default HeroSection