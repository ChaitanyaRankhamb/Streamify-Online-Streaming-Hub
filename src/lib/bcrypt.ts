// lib/hashPassword.ts
import bcrypt from "bcryptjs"; // or "bcrypt" if you prefer

export default async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
}
