import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";

connectDB();

// Signup with GitHub
export const handleOAuthSignup = async (githubProfile: any) => {
  const { id: githubId, login: username, email } = githubProfile;

  const existingUser = await User.findOne({
    $or: [{ githubId }, { email }],
  });

  if (existingUser) {
    return { success: false, message: "User already exists. Please login." };
  }

  // Generate a secure random password
  const randomPassword = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  const newUser = await User.create({
    username,
    email,
    githubId,
    password: hashedPassword,
    role: "user",
  });

  return { success: true, user: newUser };
};

// Login with GitHub
export const handleOAuthLogin = async (githubProfile: any) => {
  const { id: githubId, email } = githubProfile;

  const existingUser = await User.findOne({
    $or: [{ githubId }, { email }],
  });

  if (!existingUser) {
    return { success: false, message: "No account found. Please signup first." };
  }

  return { success: true, user: existingUser };
};
