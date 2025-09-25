// lib/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";

interface GenerateTokenOptions extends SignOptions {}

/**
 * Generate a JWT token
 * @param payload - Object or string to encode
 * @param secret - JWT secret key
 * @param options - Optional JWT sign options
 * @returns Signed JWT token
 */
export function generateToken(
  payload: string | object | Buffer,
  secret: string,
  options?: GenerateTokenOptions
): string {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    ...(options || {}),
  });
}

/**
 * Verify a JWT token
 * @param token - JWT token to verify
 * @param secret - JWT secret key
 * @returns Decoded payload
 */
export function verifyToken<T = any>(token: string, secret: string): T | null {
  try {
    return jwt.verify(token, secret) as T;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
