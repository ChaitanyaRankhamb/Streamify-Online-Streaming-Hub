"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Streamify
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your ultimate destination for movies, shows, and exclusive content.
            Experience smooth streaming, curated recommendations, and premium entertainment—all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Quick Links</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#home" className="hover:text-accent transition">Home</a></li>
            <li><a href="#features" className="hover:text-accent transition">Features</a></li>
            <li><a href="#trending" className="hover:text-accent transition">Trending</a></li>
            <li><a href="#pricing" className="hover:text-accent transition">Pricing</a></li>
            <li><a href="#responses" className="hover:text-accent transition">User Responses</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-primary">Support</h2>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            <li><a href="#help" className="hover:text-accent transition">Help Center</a></li>
            <li><a href="#faq" className="hover:text-accent transition">FAQs</a></li>
            <li><a href="#contact" className="hover:text-accent transition">Contact Support</a></li>
            <li><a href="#privacy" className="hover:text-accent transition">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-accent transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-primary">Follow Us</h2>
          <div className="flex gap-4 text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-blue-500 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-red-600 transition"><Youtube size={20} /></a>
            <a href="#" className="hover:text-blue-600 transition"><Linkedin size={20} /></a>
          </div>

          <h2 className="text-xl font-semibold mb-2 text-primary">Newsletter</h2>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-accent transition font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border mt-8 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        © 2025 Streamify. All rights reserved.
      </div>
    </footer>
  );
}
