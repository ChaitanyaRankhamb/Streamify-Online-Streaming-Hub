

import { newReleases } from "@/data/NewReleases";
import HeroSection from "@/components/Home/Hero-section";
import HomeMovieFeature from "@/components/Home/Home-Movie-Feature";
import { Button } from "@/components/ui/button";
import React from "react";
import HeroSectionServer from "@/components/Home/HeroSectionServer";

export default async function page() {
  const movies = await HeroSectionServer();
  
  return (
    <div>
      <HeroSection movies = { movies } />
      <HomeMovieFeature
        featureName="New Releases"
        featureMovieArray={newReleases}
      />
      
    </div>
  );
}
