import HeroSection from "@/components/Home/Hero-section";
import HomeMovieFeature from "@/components/Home/Home-Movie-Feature";
import React from "react";
import HeroSectionServer from "@/components/Home/HeroSectionServer";
import NewMoviesFeatureServer from "@/components/Home/NewMoviesFeatureServer";

export default async function page() {
  const heroBannerMovies = await HeroSectionServer();
  const newReleasedMovies = await NewMoviesFeatureServer();
  
  return (
    <div>
      <HeroSection movies = { heroBannerMovies } />
      <HomeMovieFeature
        featureName="New Releases"
        featureMovieArray={ newReleasedMovies }
      />      
    </div>
  );
}
