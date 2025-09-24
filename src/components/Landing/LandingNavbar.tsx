"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../Theme-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent"
        >
          Streamify
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-6 font-medium text-gray-700 dark:text-gray-300">
          {[
            { label: "Features", id: "features" },
            { label: "Pricing", id: "pricing" },
            { label: "Trend", id: "trending" },
            { label: "Responses", id: "responses" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => {
                const element = document.getElementById(link.id);
                if (element) {
                  const yOffset = -100; // scroll 100px above
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="hover:text-blue-500"
            >
              {link.label}
            </button>
          ))}
        </div>


        {/* Right: Auth Buttons + Theme Toggle + Mobile Button */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth + Theme */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Log in
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white">
              Sign Up
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 pb-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#pricing" className="hover:text-blue-500">Pricing</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#help" className="hover:text-blue-500">Help</a>
          <div className="flex gap-2">
            <Button variant="outline" className="w-20">Log in</Button>
            <Button variant="secondary" className="w-20 bg-primary text-white">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
