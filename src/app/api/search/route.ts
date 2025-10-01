import { connectDB } from "@/lib/mongoose";
import MovieModel from "@/models/movies";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // connect to database
    await connectDB();

    const { searchParams } = new URL(request.url);
    const decodedQuery = searchParams.get("query") || "";
    const query = decodeURIComponent(decodedQuery);

    if (!query) return NextResponse.json([]);

    const movies = await MovieModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        // { genre: { $regex: query, $options: "i" } },
        // { "cast.name": { $regex: query, $options: "i" } },
      ],
    }).lean()
    .limit(25);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
