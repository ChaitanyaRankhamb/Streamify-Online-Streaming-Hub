import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import MovieModel from "../../../../models/movies";
import HeroBannerModel from "../../../../models/heroBannerSchema";

export async function GET() {
  try {
    await connectDB();
    console.log("Database connected successfully!");

    // 1️⃣ Fetch movies you want in the hero banner
    const movies = await MovieModel.find().limit(10); // top 10 for example

    if (!movies.length) {
      return NextResponse.json(
        { error: "No movies found. Seed the Movie collection first." },
        { status: 400 }
      );
    }

    // 2️⃣ Clear existing hero banners
    await HeroBannerModel.deleteMany({});
    console.log("Existing hero banners cleared!");

    // 3️⃣ Prepare HeroBanner documents
    const heroBanners = movies.map((movie, index) => ({
      movie: movie._id,       // Reference to Movie
      position: index + 1,    // Banner order
      active: true,
      startDate: new Date(),
      endDate: undefined,
    }));

    // 4️⃣ Insert into HeroBanner collection
    const insertedBanners = await HeroBannerModel.insertMany(heroBanners);
    console.log(`${insertedBanners.length} Hero Banner Movies Inserted Successfully!`);

    return NextResponse.json({
      message: `${insertedBanners.length} Hero Banner Movies Inserted Successfully!`,
    });
  } catch (error) {
    console.error("Error while inserting hero banners:", error);
    return NextResponse.json(
      { error: "Internal Server Error while inserting hero banners" },
      { status: 500 }
    );
  }
}
