"use client";

import { motion } from "framer-motion";
import { userResponses } from "../constants/userResponse";

export default function UserResponses() {
  // Different animation variants
  const animations = [
    { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }, // slide up
    { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }, // slide left
    { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }, // slide right
    { hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }, // zoom in
    { hidden: { rotate: -10, opacity: 0 }, visible: { rotate: 0, opacity: 1 } }, // rotate
    { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } }, // drop down
    { hidden: { x: -80, opacity: 0 }, visible: { x: 0, opacity: 1 } }, // deep slide left
    { hidden: { x: 80, opacity: 0 }, visible: { x: 0, opacity: 1 } }, // deep slide right
    { hidden: { scale: 1.2, opacity: 0 }, visible: { scale: 1, opacity: 1 } }, // pop in
    { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } }, // rise up
  ];

  return (
    <div id="responses" className="flex flex-col md:flex-row items-start justify-between gap-6 py-12 px-6 max-w-[1200px] bg-background rounded-2xl shadow-lg border border-border mx-[5%] lg:mx-auto max-sm:max-w-[500px]">
      {/* Left Title */}
      <p className="responsive-heading text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-primary via-secondary to-accent mb-10 md:mb-0 basis-2/5">
        What Our <span className="font-bold text-5xl">Users</span> Say?
      </p>

      {/* Right Responses Section */}
      <div className="w-full max-h-[600px] bg-card rounded-2xl overflow-y-scroll overflow-x-hidden relative flex flex-col scrollbar-hide border border-border">
        {/* Sticky Header / Mini Navbar */}
        <div className="sticky top-0 w-full bg-primary/95 dark:bg-secondary/90 backdrop-blur-md z-20 border-b border-border flex items-center justify-center h-16 px-4">
          <h2 className="text-xl font-semibold text-background">
            User Responses
          </h2>
        </div>

        {/* Responses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-6">
          {userResponses.map((response, i) => (
            <motion.div
              key={response.id}
              variants={animations[i % animations.length]} // pick unique animation
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-6 rounded-xl shadow-md border border-border bg-background text-foreground hover:shadow-xl hover:scale-[1.02] transition"
            >
              <p className="text-lg font-medium mb-2 text-destructive">@{response.username}</p>
              <p className="text-base">{response.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
