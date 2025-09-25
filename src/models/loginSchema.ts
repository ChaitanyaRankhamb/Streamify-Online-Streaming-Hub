import { z } from "zod";

// Zod schema for login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
});

// Function to validate login data
export function validateLogin(data: { email: string; password: string }) {
  return loginSchema.safeParse(data);
}