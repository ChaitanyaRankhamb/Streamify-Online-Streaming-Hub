"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function page() {
  const handleSeedMovies = async () => {
    try {
      const res = await fetch("/api/scripts/seedMovies");
      const data = await res.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error(error);
      alert("Failed to seed movies");
    }
  };

  const handleHeroBannerMovies = async () => {
    try {
      const res = await fetch("/api/scripts/heroBannerMovies");
      const data = await res.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error(error);
      alert("Failed to seed movies");
    }
  };

  const handleNewReleasedMovies = async () => {
    try {
      const res = await fetch("/api/scripts/newReleasedMovies");
      const data = await res.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error(error);
      alert("Failed to seed movies");
    }
  };

  return (
    <div>
      <Button
        className="bg-primary text-primary-foreground rounded-md border-2 border-border"
        onClick={handleSeedMovies}
      >
        seed movies
      </Button>
      <Button
        className="bg-primary text-primary-foreground rounded-md border-2 border-border"
        onClick={handleHeroBannerMovies}
      >
        Hero Banner movies
      </Button>
      <Button
        className="bg-primary text-primary-foreground rounded-md border-2 border-border"
        onClick={handleNewReleasedMovies}
      >
        New Released Movies
      </Button>
    </div>
  );
}

export default page;
