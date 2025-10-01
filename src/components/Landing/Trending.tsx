"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trendingMovies } from "../../data/trending";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TrendingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [w, setW] = useState<number>(280);

  useEffect(() => {
    const updateWidth = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth < 480) setW(160);
      else if (innerWidth < 768) setW(200);
      else if (innerWidth < 1024) setW(250);
      else setW(280);
    };

    // Initial set
    updateWidth();

    // Listen to resize events
    window.addEventListener("resize", updateWidth);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto-play every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % trendingMovies.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length
    );
  };

  return (
    <div id="trending" className="flex flex-col justify-center items-center">
      <p className="responsive-heading text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent mb-10">
        OUR TRENDINGS
      </p>

      <div className="relative flex items-center justify-center h-[520px] w-full overflow-hidden px-6 py-20 max-sm:h-[400px] max-md:h-[450px]">
        {trendingMovies.map((movie, index) => {
          // Relative position (wraps around smoothly)
          const position =
            (index - activeIndex + trendingMovies.length) %
            trendingMovies.length;

          // Default transform values
          let x = 0;
          let scale = 0.6;
          let opacity = 0;
          let zIndex = 0;

          if (position === 0) {
            x = 0;
            scale = 1;
            opacity = 1;
            zIndex = 10;
          } else if (position === 1) {
            x = w * 0.9;
            scale = 0.8;
            opacity = 0.9;
            zIndex = 5;
          } else if (position === 2) {
            x = w * 1.65;
            scale = 0.7;
            opacity = 0.7;
            zIndex = 3;
          } else if (position === trendingMovies.length - 1) {
            x = w * -0.9;
            scale = 0.8;
            opacity = 0.9;
            zIndex = 5;
          } else if (position === trendingMovies.length - 2) {
            x = w * -1.65;
            scale = 0.7;
            opacity = 0.7;
            zIndex = 3;
          }

          return (
            <motion.div
              key={movie.id}
              animate={{ x, scale, opacity, zIndex }}
              transition={{ duration: 0.8 }}
              className="absolute h-[400px] w-[280px] rounded-xl border border-border bg-card overflow-hidden max-sm:h-[240px] max-sm:w-[160px] max-md:h-[280px] max-md:w-[200px] max-lg:h-[360px] max-lg:w-[250px]"
            >
              <Image
                src={movie.poster}
                alt={movie.title}
                width={280}
                height={400}
                className="object-cover rounded-xl"
                priority={position === 0} // preload only the active image
              />
            </motion.div>
          );
        })}

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-25 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-secondary/50 text-destructive rounded-full p-3 shadow-lg transition border border-muted-foreground/40"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-25 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-secondary/50 text-destructive rounded-full p-3 shadow-lg transition border border-muted-foreground/40"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
