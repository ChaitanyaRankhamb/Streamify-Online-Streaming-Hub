import { Schema, model, Document, models } from "mongoose";
import * as z from "zod";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  githubId?: string; // OAuth-specific field
  isVerified: boolean;
  verificationToken?: string;
  verificationCode?: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Zod Schema for Validation
export const userValidationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters")
    .optional(),

  role: z.enum(["user", "admin"]).default("user"),
  githubId: z.string().optional(), // Optional for OAuth users
  isVerified: z.boolean().default(false),

  verificationToken: z.string().optional(),

  verificationCode: z
    .string()
    .length(6, "Verification code must be 6 characters")
    .optional(),

  expiryDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Expiry date must be in the future",
    })
    .optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Mongoose Schema aligned with IUser
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.githubId; // required if not using GitHub OAuth
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true, // allows multiple docs without githubId
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    verificationCode: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
);

const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;
