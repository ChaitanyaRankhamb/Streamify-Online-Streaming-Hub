"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Theme-toggle";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import GetServerSession from "@/lib/getServerSession";
import { Session } from "inspector/promises";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { Search } from "lucide-react";

const navCategories: { title: string; href: string; description?: string }[] = [
  { title: "Home", href: "/" },
  {
    title: "Movies",
    href: "/movies",
    description: "Browse all movies by genre or popularity.",
  },
  {
    title: "TV Shows",
    href: "/tv-shows",
    description: "Find trending and popular TV shows.",
  },
  {
    title: "Trending",
    href: "/trending",
    description: "See what’s trending now on Streamify.",
  },
  {
    title: "My List",
    href: "/my-list",
    description: "Access your personal watchlist.",
  },
];

export default function StreamifyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b transition-colors backdrop-blur-md"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"
        >
          Streamify
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex gap-6 font-medium">
          {navCategories.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop */}

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-background/80 w-[36px] h-[36px] rounded-[8px] flex items-center
             justify-center border-2 border-border hover:bg-muted-foreground/20 active:scale-90">
              <Search size={18} />
            </div>
            <div className="bg-background/80 w-[36px] h-[36px] rounded-[8px] flex items-center justify-center border border-2-border hover:bg-muted-foreground/30">
              <ModeToggle />
            </div>
            {session ? (
              <Avatar>
                <AvatarImage
                  src={session.user?.avatar ?? ""}
                  alt={session.user?.name || "Avatar"}
                />
                <AvatarFallback>
                  {session.user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <div className="bg-background/80 w-[36px] h-[36px] rounded-[8px] flex items-center justify-center border-2 border-border hover:bg-muted-foreground/20 active:scale-90">
              <Search size={18} className="" />
            </div>
            <div className="bg-background/80 w-[30px] h-[30px] rounded-[8px] flex items-center justify-center border border-1-border hover:bg-muted-foreground/30">
              <ModeToggle  />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-background/80 w-[36px] h-[36px] rounded-[8px] flex items-center justify-center border border-1-border text-[var(--foreground)"
            >
              {isOpen ? (
                  <span>✕</span>
              ) : (
                  <span>☰</span>
              )}
            </button>
            <Avatar>
              {session ? (
                <AvatarImage
                  src={session.user?.avatar ?? ""}
                  alt={session.user?.name || "Avatar"}
                />
              ) : (
                <AvatarFallback>U</AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden flex flex-col space-y-4 px-6 pb-4 border-t transition-colors z-20"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        >
          {navCategories.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-[var(--foreground)] py-2 px-4 rounded-md hover:bg-[var(--muted)] transition-colors"
            >
              {link.title}
            </Link>
          ))}

          {!session && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
