// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "Streamify_Online_Streaming_Hub",
      bufferCommands: false,
    });
    isConnected = true;
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Mongoose connection error:", err);
    throw err;
  }
};
