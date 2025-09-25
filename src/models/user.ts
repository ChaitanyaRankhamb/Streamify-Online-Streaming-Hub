import { Schema, model, Document, models } from "mongoose";
import * as z from "zod";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// Zod Schema for Validation

export const userValidationSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),

  email: z.string()
    .email("Invalid email format"),

  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),

  role: z.enum(["user", "admin"]).default("user"),

  // Optional for creation, automatically set by mongoose
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


// Mongoose Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
