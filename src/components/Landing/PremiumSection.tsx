import React from 'react'
import { motion } from "framer-motion"
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Music, Video, Star, Sparkles } from "lucide-react"

const premiumFreatures = [
  "Offline Downloads",
  "Ad-Free Streaming",
  "High-Quality Video",
  "High-Quality Audio",
  "Early Releases",
];

function PremiumSection() {
  return (
    <div id='pricing' className='flex flex-col justify-center items-center mt-20 mx-[10%]'>
      <p className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent">OUR PREMIUM MODE</p>
      <section className="relative flex flex-col md:flex-row justify-center items-center gap-8 px-6 py-20">

        {/* Text */}
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
            Experience Entertainment the Way It’s Meant to Be
          </h2>
          <p className="mb-4 text-destructive text-xl">
            Premium subscription perks:
          </p>

          <div className="grid grid-cols-6 gap-6 px-6 py-16">
            {/* Offline Downloads */}
            <Card className="col-span-2 bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                <Download className="h-10 w-10 text-accent" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Offline Downloads
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Ad-Free Streaming */}
            <Card className="col-span-2 bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                <Sparkles className="h-10 w-10 text-accent" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Ad-Free Streaming
                </CardTitle>
              </CardHeader>
            </Card>

            {/* High-Quality Video */}
            <Card className="col-span-2 bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                <Video className="h-10 w-10 text-accent" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  High-Quality Video
                </CardTitle>
              </CardHeader>
            </Card>

            {/* High-Quality Audio */}
            <Card className="col-start-2 col-end-4 bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                <Music className="h-10 w-10 text-accent" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  High-Quality Audio
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Early Releases */}
            <Card className="col-span-2 bg-card backdrop-blur-xl border-border shadow-md hover:scale-105 hover:shadow-xl hover:border-ring hover:border transition-all duration-300">
              <CardHeader className="flex flex-col items-center justify-center space-y-3">
                <Star className="h-10 w-10 text-accent" />
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Early Releases
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Button className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white">
            Join Premium Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default PremiumSection