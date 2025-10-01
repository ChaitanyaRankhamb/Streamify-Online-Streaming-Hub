"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Play } from "lucide-react";

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

interface HomeMovieFeatureProps {
  featureName: string;
  featureMovieArray: Movie[];
}

const HomeMovieFeature: React.FC<HomeMovieFeatureProps> = ({
  featureName,
  featureMovieArray,
}) => {
  return (
    <div className="flex flex-col py-6 px-4 md:px-10 lg:px-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          {featureName}
        </h2>
        <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 hover:scale-105 transition-all duration-300 shadow-md">
          Show More
        </Button>
      </div>

      {/* Movie Slider */}
      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

        <div className="relative overflow-x-auto no-scrollbar flex gap-5 py-2 scroll-smooth snap-x">
          {featureMovieArray.map((movie) => (
            <div
              key={movie.id}
              className="w-[120px] h-[150px] sm:w-[140px] sm:h-[160px] md:w-[160px] md:h-[180px] lg:w-[180px] lg:h-[240px] flex-shrink-0 rounded-xl overflow-hidden shadow-lg snap-start cursor-pointer group"
            >
              <div className="relative w-full h-full">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />

                {/* Play Button on Hover */}
                <Button
                  className="
      absolute bottom-4 right-4 
      opacity-0 group-hover:opacity-100 
      transition-all duration-300 ease-in-out 
      bg-gradient-to-r from-purple-600 to-pink-500 
      text-white p-3 rounded-full shadow-lg
      hover:scale-110 active:scale-95 md:w-14 md:h-14 w-12 h-12 
    "
                >
                  <Play size={2} />
                </Button>
              </div>

              {/* Title always visible */}
              <p className="text-sm md:text-base font-medium text-center mt-2 text-muted-foreground line-clamp-2 truncate">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar hidden */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default HomeMovieFeature;
