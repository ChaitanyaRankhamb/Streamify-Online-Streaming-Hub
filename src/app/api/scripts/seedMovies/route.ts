import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose"; // adjust relative path
import MovieModel from "../../../../models/movies";
import { movieData } from "../../../../data/MoviesData";

const PLACEHOLDER_BACKDROP =
  "https://via.placeholder.com/1280x720?text=Backdrop";
const PLACEHOLDER_VIDEO = "https://www.example.com/video.mp4";
const PLACEHOLDER_PROFILE = "https://via.placeholder.com/200x300?text=Profile";

// Prepare movies
export const preparedMovies = movieData.map((movie) => ({
  id: movie.id,
  title: movie.title || "Untitled Movie",
  genres: movie.genres || ["Unknown"],
  poster: movie.poster || "https://via.placeholder.com/500x750?text=Poster",
  backdrop: movie.backdrop || PLACEHOLDER_BACKDROP,
  video: movie.video || PLACEHOLDER_VIDEO,
  rating: typeof movie.rating === "number" ? movie.rating : 0,
  runtime: movie.runtime || 90,
  description: movie.description || "No description available.",
  cast: (movie.cast || []).map((c) => ({
    name: c.name || "Unknown Actor",
    character: c.character || "Unknown Character",
    profile_path: c.profile_path || PLACEHOLDER_PROFILE,
  })),
  director: movie.director || "Unknown Director",
  release_date: movie.release_date || "2025-01-01",
  original_language: movie.original_language || "en",
  tmdb_url: movie.tmdb_url || "https://www.themoviedb.org/",
  primary_genre: movie.primary_genre || movie.genres?.[0] || "Unknown",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export async function GET() {
  try {
    // connect to DB
    await connectDB();
    console.log("Database connected successfully!");

    // clear existing movies (optional)
    await MovieModel.deleteMany({});
    console.log("Existing movies cleared!");

    // insert movies
    const insertedMovies = await MovieModel.insertMany(preparedMovies);
    console.log(`${insertedMovies.length} Movies Inserted Successfully!`);

    return NextResponse.json({
      message: `${insertedMovies.length} Movies Inserted Successfully!`,
    });
  } catch (error) {
    console.error("Error while inserting movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error while inserting movies" },
      { status: 500 }
    );
  }
}
