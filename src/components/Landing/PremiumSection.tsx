"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Music, Video, Star, Sparkles } from "lucide-react";

const premiumFeatures = [
  { name: "Offline Downloads", icon: <Download className="h-10 w-10 text-accent" /> },
  { name: "Ad-Free Streaming", icon: <Sparkles className="h-10 w-10 text-accent" /> },
  { name: "High-Quality Video", icon: <Video className="h-10 w-10 text-accent" /> },
  { name: "High-Quality Audio", icon: <Music className="h-10 w-10 text-accent" /> },
  { name: "Early Releases", icon: <Star className="h-10 w-10 text-accent" /> },
];

export default function PremiumSection() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth === null) return null;

  return (
    <div
      id="pricing"
      className="flex flex-col justify-center items-center max-sm:mt-0 mx-[0] md:mx-[5%] lg:mx-[10%]"
    >
      <p className="responsive-heading text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent">
        OUR PREMIUM MODE
      </p>

      <section className="relative flex flex-col justify-center items-center gap-8 px-6 py-20 w-full">
        {/* Text Section */}
        <div className="relative z-10 text-center max-sm:w-full">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 lg:w-4xl">
            Experience Entertainment the Way It’s Meant to Be
          </h2>
          <p className="mb-4 text-destructive text-md sm:text-lg lg:text-2xl 2xl:text-3xl">Premium subscription perks:</p>
        </div>

        {/* Feature Cards */}
        {windowWidth < 480 ? (
          // Mobile layout
          <div className="flex flex-col justify-center items-center w-full h-auto border border-border rounded-lg bg-background px-4 py-6 space-y-4">
            {premiumFeatures.map((feature, idx) => (
              <Card key={idx} className="bg-card w-full p-4">
                <CardHeader className="flex flex-col items-center justify-center space-y-2">
                  {feature.icon}
                  <CardTitle className="text-md font-semibold text-card-foreground">
                    {feature.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          // Large screen layout
          <div className="grid grid-cols-6 gap-6 px-6 py-6 w-full">
            {premiumFeatures.map((feature, idx) => {
              // Optionally, customize the column span for specific cards
              let colSpanClass = "col-span-2"; // default
              if (feature.name === "High-Quality Audio") colSpanClass = "col-start-2 col-end-4";

              return (
                <Card
                  key={idx}
                  className={`bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300 ${colSpanClass}`}
                >
                  <CardHeader className="flex flex-col items-center justify-center space-y-3">
                    {feature.icon}
                    <CardTitle className="text-xl font-semibold text-card-foreground sm:text-sm lg:text-xl">
                      {feature.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

        )}

        <Button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white">
          Join Premium Now
        </Button>
      </section>
    </div>
  );
}
