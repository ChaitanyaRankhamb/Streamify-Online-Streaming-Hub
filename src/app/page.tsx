"use client";

import LandingNavbar from "@/components/Landing/LandingNavbar";
import { useEffect, useState } from "react";
import Features from "@/components/Landing/Features";
import PremiumSection from "@/components/Landing/PremiumSection";
import TrendingCarousel from "@/components/Landing/Trending";
import UserResponses from "@/components/Landing/userResponse";
import Footer from "@/components/Landing/Footer";
import HeroSection from "@/components/Landing/HeroSection";

export default function LandingPage() {
  
  return (
    <div className="relative bg-background text-gray-900 dark:text-white min-h-screen overflow-x-hidden">
      {/* loading navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Premium Section */}
      <PremiumSection />

      {/* Trending Section */}
      <TrendingCarousel />

      {/* Testimonials */}
      <UserResponses />

      {/* Footer */}
      <Footer />
    </div>
  );
}
