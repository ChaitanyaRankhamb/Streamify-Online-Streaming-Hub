"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Example feature cards data
const featureCards = [
  {
    id: "MOVIES",
    title: "Unlimited Movies",
    features: [
      "Unlimited streaming of blockbusters, classics, and originals",
      "HD, Full HD & 4K support",
      "Multi-language subtitles & dubbing",
      "Cross-device support (TV, mobile, laptop)",
      "Offline downloads",
      "Smart recommendations based on your watch history",
    ],
  },
  {
    id: "SONGS",
    title: "Music That Moves You",
    features: [
      "Ad-free music experience",
      "High-quality audio (320kbps / Lossless option)",
      "Curated playlists for moods & occasions",
      "AI-powered recommendations tailored to your taste",
      "Offline listening",
      "Smart speaker integration (Alexa, Google Home)",
    ],
  },
  {
    id: "PODCASTS",
    title: "Podcasts On-Demand",
    features: [
      "Wide range of genres — news, comedy, education, and more",
      "Save & organize episodes into custom playlists",
      "Download episodes offline",
      "Resume listening where you left off",
      "Exclusive shows & creator content",
      "Personalized discovery to find new voices",
    ],
  },
];

export default function FeatureSection() {
  return (
    <div
      id="features"
      className="flex flex-col justify-center items-center mt-20 text-center sm:text-left"
    >
      <p className="responsive-heading text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent">
        OUR FEATURES
      </p>

      {/* grid: mobile/tablet -> 1 col, md (>=768px) -> 2 cols, lg (>=1024px) -> 3 cols */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 py-20  place-items-stretch max-sm:mx-[0] max-lg:mx-[5%] mx-[10%] max-[400px]:px-2">
        {featureCards.map((card, idx) => {
          const isLast = idx === featureCards.length - 1;
          const mod2 = featureCards.length % 2; // used for md centering
          const mod3 = featureCards.length % 3; // used for lg centering (single leftover)

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.28 }}
              className={cn(
                "flex", // make the grid item a flex container so card inside can stretch
                // md centering: only for md/2-col layout. reset at lg with lg:col-span-1/lg:justify-self-auto
                isLast && mod2 !== 0
                  ? "md:col-span-2 md:justify-self-center lg:col-span-1 lg:justify-self-auto"
                  : "",
                // lg centering for a single leftover (mod3 === 1): place it in column 2 (middle column)
                // this only applies at lg and above.
                isLast && mod3 === 1 ? "lg:col-start-2 lg:col-end-3" : ""
              )}
            >
              <Card className="bg-card border border-border shadow-lg rounded-xl hover:border-ring flex flex-col w-full">
                <CardHeader className="flex flex-col justify-center items-center">
                  <CardTitle className="font-semibold text-destructive text-2xl max-sm:text-xl">
                    {card.id}
                  </CardTitle>
                  <p className="text-card-foreground text-lg max-sm:text-md">
                    {card.title}
                  </p>
                </CardHeader>

                <CardContent className="max-sm:px-2 max-sm:flex-col max-sm:justify-start">
                  <h2 className="text-xl font-medium mb-3 max-sm:text-sm max-lg:text-sm">
                    Features:
                  </h2>
                  <ul className="list-decimal list-outside pl-5 space-y-2 text-muted-foreground max-sm:text-xs max-md:text-sm">
                    {card.features.map((feature, fIdx) => (
                      <li key={fIdx}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
