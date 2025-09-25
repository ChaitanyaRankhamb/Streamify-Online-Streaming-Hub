import { z } from "zod";

const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),

  email: z.string()
    .email("Invalid email format"),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[\W_]/, "Password must contain at least one special character, one digit, one uppercase letter, and one lowercase letter"),
});

// Function to validate registration data
export function validateRegister(data: { username: string; email: string; password: string }) {
  return registerSchema.safeParse(data);
}

export type RegisterSchema = z.infer<typeof registerSchema>;