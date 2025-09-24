"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <div id="features" className="flex flex-col justify-center items-center mt-20">
      <p className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent">OUR FEATURES</p>
      <section className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 py-20 mx-[10%]">
        {featureCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Card className="bg-card border border-border shadow-lg rounded-xl hover:border-ring">
              <CardHeader className="flex flex-col justify-center items-center">
                <CardTitle className="text-2xl font-semibold text-destructive">
                  {card.id}
                </CardTitle>
                <p className="text-card-foreground text-lg">{card.title}</p>
              </CardHeader>

              <CardContent>
                <h2 className="text-lg font-medium mb-3">Features:</h2>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  {card.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>

  );
}
