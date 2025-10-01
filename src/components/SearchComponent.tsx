"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import Image from "next/image";

interface SearchComponentProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function SearchComponent({ open, setOpen }: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // Fetch movies from API when query changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    const debounce = setTimeout(fetchMovies, 400); // debounce
    return () => clearTimeout(debounce);
  }, [query]);

  if (!open) return null; // don’t render when closed

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50">
      <Card className="mt-20 w-[500px] max-h-[60vh] bg-background border border-border rounded-lg shadow-xl flex flex-col">
        {/* Header with Input + Close */}
        <div className="flex items-center gap-2 p-3 border-b">
          <div className="relative w-full">
            <Input
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pr-8" // padding-right for the X button space
            />

            {/* X button inside input */}
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Close overlay button */}
          <button onClick={() => setOpen(false)}>
            <X
              size={22}
              className="text-muted-foreground hover:text-foreground transition"
            />
          </button>
        </div>

        {/* Related Results */}
        <CardContent className="overflow-y-auto p-2 space-y-2 scrollbar-hide">
          {results.length > 0 ? (
            results.map((movie) => (
              <div
                key={movie._id}
                className="flex items-center justify-between p-2 px-2 hover:bg-muted rounded-md cursor-pointer"
              >
                {/* Left: Movie title with highlighted query */}
                <div>
                  <span className="font-medium">
                    {movie.title
                      .split(new RegExp(`(${query})`, "gi"))
                      .map((part: string, i: number) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <span key={i} className="text-primary font-semibold">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                  </span>
                </div>

                {/* Right: Poster */}
                <Image
                  src={movie.backdrop || "/placeholder.png"}
                  alt={movie.title}
                  width={70}
                  height={0}
                  className="rounded-sm object-contain"
                />
              </div>
            ))
          ) : query.length > 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No results found
            </p>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Start typing to search...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchComponent;
