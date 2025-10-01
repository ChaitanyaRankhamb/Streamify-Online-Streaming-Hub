import { Schema, model, Document, models } from "mongoose";
import * as z from "zod";

export type CastMember =
  | {
      name: string;
      character: string;
      profile_path: string;
    }
  | {
      name: string;
      character: string;
      profile_path: null;
    };

export interface IMovie extends Document {
  id: number;
  title: string;
  genres: string[];
  poster: string;
  backdrop: string;
  video: string;
  rating: number;
  runtime: number;
  description: string;
  cast: CastMember[];
  director: string;
  release_date: string;
  original_language: string;
  tmdb_url: string;
  primary_genre: string;
  createdAt: Date;
  updatedAt: Date;
}

// Zod Schema for Validation
export const movieValidationSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  genres: z.array(z.string()),
  poster: z.string().url(),
  backdrop: z.string().url(),
  video: z.string().url(),
  rating: z.number().min(0).max(10),
  runtime: z.number().min(1),
  description: z.string(),
  cast: z.array(
    z.object({
      name: z.string(),
      character: z.string(),
      profile_path: z.string().nullable(),
    })
  ),
  director: z.string(),
  release_date: z.string(),
  original_language: z.string(),
  tmdb_url: z.string().url(),
  primary_genre: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Mongoose Schema aligned with IMovie
const movieSchema = new Schema<IMovie>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    genres: { type: [String], required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, required: true },
    video: { type: String, required: true },
    rating: { type: Number, required: true },
    runtime: { type: Number, required: true },
    description: { type: String, required: true },
    cast: [
      {
        name: { type: String, required: true },
        character: { type: String, required: true },
        profile_path: { type: String, default: null },
      },
    ],
    director: { type: String, required: true },
    release_date: { type: String, required: true },
    original_language: { type: String, required: true },
    tmdb_url: { type: String, required: true },
    primary_genre: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
);

const MovieModel = models.Movie || model<IMovie>("Movie", movieSchema);

export default MovieModel;
