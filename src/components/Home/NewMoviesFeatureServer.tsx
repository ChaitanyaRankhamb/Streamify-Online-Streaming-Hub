import { connectDB } from "@/lib/mongoose";
import MovieModel from "@/models/movies";
import NewReleasesModel from "@/models/newReleasesSchema";

export default async function NewMoviesFeatureServer() {
  try {
    await connectDB();

    // 1️⃣ Fetch only movie ObjectIds
    const releases = await NewReleasesModel.find({}).select("movie -_id").lean();
    const movieIds = releases.map((r) => r.movie);

    // 2️⃣ Use movieIds to fetch movies
    const newReleasedMovies = await MovieModel.find({
      _id: { $in: movieIds },
    }).lean();

    return JSON.parse(JSON.stringify(newReleasedMovies));
  } catch (error) {
    console.error("Internal server error while retrieving new movies data ", error);
    return null;
  }
}

