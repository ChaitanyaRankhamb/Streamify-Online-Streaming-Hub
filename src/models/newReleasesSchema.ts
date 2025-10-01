import { Schema, model, Document, models } from "mongoose";
import z from "zod";

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

/// New Releases interface
export interface INewRelease extends Document {
  movie: Schema.Types.ObjectId; // reference to Movie
  position: number; 
  active: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const newReleasesSchema = new Schema<INewRelease>(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    position: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

// Create NewReleasesModel
const NewReleasesModel = models.NewReleases || model<INewRelease>("NewReleases", newReleasesSchema);

export default NewReleasesModel;