// services/signup.ts
import { UserAlreadyExistsError, EmailAlreadyExistsError, ErrorInUserCreation } from "../lib/error";
import hashPassword from "../lib/bcrypt";
import User, { userValidationSchema } from "../models/user"; // Import your Mongoose User model
import { connectDB } from "@/lib/mongoose";

export async function HandleUserRegistrationService(username: string, email: string, password: string, role?: "user" | "admin") {
  // connect the db
  await connectDB();

  // Validate input with Zod
  const parsed = userValidationSchema.safeParse({ username, email, password, role });

  if (!parsed.success) {
    // Use .issues to get error messages
    const errorMessage = parsed.error.issues[0]?.message || "Invalid input";
    throw new Error(errorMessage);
  }

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    // username already exist
    if (existingUser.username === username)
      throw new UserAlreadyExistsError();

    // email already exist
    if (existingUser.email === email)
      throw new EmailAlreadyExistsError();
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    // Create user using Mongoose model
    const newUser = await User.create({ username, email, password: hashedPassword });
    return newUser;
  } catch (error) {
    throw new ErrorInUserCreation();
  }
}
