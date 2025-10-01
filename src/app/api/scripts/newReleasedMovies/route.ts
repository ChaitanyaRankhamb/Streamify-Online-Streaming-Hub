import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import MovieModel from "../../../../models/movies";
import HeroBannerModel from "../../../../models/heroBannerSchema";
import { newReleases } from "@/data/NewReleases";
import NewReleasesModel from "@/models/newReleasesSchema";

export async function GET() {
  try {
    await connectDB();
    console.log("Database connected successfully!");

    const movieIds = newReleases.map((m) => m.id); // [1061474, 12345, ...]
    const movies = await MovieModel.find({ id: { $in: movieIds } }).lean();

    if (!movies.length) {
      return NextResponse.json(
        { error: "No movies found. Seed the Movie collection first." },
        { status: 400 }
      );
    }

    // 2️⃣ Clear existing hero banners
    await NewReleasesModel.deleteMany({});
    console.log("Existing hero banners cleared!");

    // 3️⃣ Prepare HeroBanner documents
    const newReleasedMovies = movies.map((movie, index) => ({
      movie: movie._id, // Reference to Movie
      position: index + 1, // Banner order
      active: true,
      startDate: new Date(),
      endDate: undefined,
    }));

    // 4️⃣ Insert into HeroBanner collection
    const newReleasedInsertedMovies =
      await NewReleasesModel.insertMany(newReleasedMovies);
    console.log(
      `${newReleasedInsertedMovies.length} New Released Movies Inserted Successfully!`
    );

    return NextResponse.json({
      message: `${newReleasedInsertedMovies.length} New Released Movies Inserted Successfully!`,
    });
  } catch (error) {
    console.error("Error while inserting New Released movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error while inserting new released movies" },
      { status: 500 }
    );
  }
}
