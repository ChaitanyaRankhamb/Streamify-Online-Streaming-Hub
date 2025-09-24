import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ModeToggle } from "./Theme-toggle";
import Link from "next/link";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

function StreamifyNavbar() {
  return (
    <nav className="flex items-center justify-between max-sm:px-4 max-md:px-8 px-20 py-3 bg-background text-foreground shadow-md ">
      {/* Logo */}
      <h1 className="text-xl font-bold tracking-wide md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-violet-600 ">
        Streamify
      </h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 text-md font-medium">
        {navlinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="relative cursor-pointer text-foreground transition-colors duration-300 
                 hover:text-primary"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 hover:w-full"></span>
          </Link>
        ))}
      </ul>


      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button (only visible on small screens) */}
        <button className="md:hidden p-2 rounded-lg hover:bg-muted focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Auth Buttons (hidden on mobile, visible on md+) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Login Button */}
          <Button
            variant="outline"
            size="sm"
            className="
      border-border text-foreground 
      hover:bg-muted hover:text-primary 
      dark:hover:bg-secondary dark:hover:text-primary-foreground
      transition-colors duration-300
    "
          >
            Login
          </Button>

          {/* Sign Up Button */}
          <Button
            variant="secondary"
            size="sm"
            className="
      bg-primary text-primary-foreground 
      hover:opacity-90 hover:shadow-md 
      dark:bg-primary dark:text-white
      dark:hover:opacity-90
      transition-all duration-300
    "
          >
            Sign Up
          </Button>
        </div>


        {/* Avatar */}
        <Avatar>
          <AvatarImage src="" alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </nav>
  );
}

export default StreamifyNavbar;
