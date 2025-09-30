"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trendingMovies } from "../constants/trending";
import Image from "next/image";
import { Play, Info } from "lucide-react";
import { Button } from "../ui/button";

export type CastMember =
  | {
    name: string;
    character: string;
    profile_path: string;
  }
  | {
    name: string;
    character: string;
    profile_path: null;
  };

interface Movie {
  id: number;
  title: string;
  genres: string[];
  poster: string;
  backdrop: string;
  video: string;
  rating: number;
  runtime: number;
  description: string;
  cast: CastMember[];
  director: string;
  release_date: string;
  original_language: string;
  tmdb_url: string;
  primary_genre: string;
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // auto-scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trendingMovies.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-background text-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key={trendingMovies[index].id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={trendingMovies[index].backdrop || trendingMovies[index].poster}
            alt={trendingMovies[index].title}
            fill
            priority
            className="object-cover rounded-2xl"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/30 to-transparent dark:bg-gradient-to-t dark:from-background dark:via-background/70 dark:to-transparent " />
        </motion.div>
      </AnimatePresence>

      {/* Movie Info Overlay */}
      <div className="absolute bottom-20 left-12 max-sm:left-0 max-w-2xl space-y-4 pr-5 pl-5">
        <motion.h2
          key={trendingMovies[index].title}
          className="text-5xl max-sm:text-2xl max-md:text-3xl font-extrabold drop-shadow-lg text-foreground"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {trendingMovies[index].title}
        </motion.h2>
        <p className="text-lg text-foreground line-clamp-3 max-sm:text-sm">
          {trendingMovies[index].description}
        </p>

        <div className="flex gap-4 mt-6">
          {/* Primary CTA - Gradient + Shadow + Hover Animation */}
          <Button
            className="
    px-6 py-2 gap-2 rounded-xl font-semibold
    bg-gradient-to-r from-primary to-secondary
    text-primary-foreground
    shadow-lg
    hover:scale-105 hover:shadow-2xl
    active:scale-95 active:shadow-md
    transition-all duration-300
    w-36 h-12 cursor-pointer
    flex items-center justify-center max-sm:w-24 max-sm:h-10 max-sm:rounded-md
  "
          >
            <Play size={20} /> Play
          </Button>

          {/* Secondary CTA - Outlined + Subtle Hover */}
          <Button
            className="
    px-6 py-2 gap-2 rounded-xl font-semibold
    bg-background
    border-2 border-accent
    text-accent-foreground
    hover:bg-accent hover:text-accent-foreground
    hover:scale-105
    active:scale-95
    transition-all duration-300
    w-36 h-12 cursor-pointer
    flex items-center justify-center max-sm:w-24 max-sm:h-10 max-sm:rounded-md max-sm:text-[12px]
  "
          >
            <Info size={20} /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
