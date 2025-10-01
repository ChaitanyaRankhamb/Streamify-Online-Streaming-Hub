import { connectDB } from "@/lib/mongoose";
import HeroBannerModel from "@/models/heroBannerSchema";
import MovieModel from "@/models/movies";

export default async function HeroSectionServer() {
  await connectDB();

  // First, get hero banner entries
  const heroBannerMovies = await HeroBannerModel.find({})
    .limit(10)
    .lean();

  // Extract movie ObjectIds
  const movieIds = heroBannerMovies.map((h) => h.movie);

  // Fetch full movies
  const movies = await MovieModel.find({ _id: { $in: movieIds } }).lean();  

  return JSON.parse(JSON.stringify(movies));
}
