import { generateToken } from "@/lib/jwt";
import getDB from "../lib/connection";
import { ErrorInSecretKey } from "../lib/error";

import bcrypt from "bcryptjs";
import User from "@/models/user";
import { cookies } from "next/headers";

export async function HandleUserLoginService(email: string, password: string) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        status: 401,
        body: { message: "User not found with this credentials." },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: 401,
        body: { message: "Invalid Credentials!" },
      };
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      throw new ErrorInSecretKey();
    }

    const token = generateToken(
      { id: user._id, email: user.email, username: user.username },
      secret,
      { expiresIn: "1d" }
    );

    // Set HTTP-only cookie using Next.js cookies API
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: 200,
      body: { token, message: "Login successful" },
    };
  } catch (error: any) {
    console.error("Service error:", error);
    return {
      status: 500,
      body: { message: "Something went wrong while logging in." },
    };
  }
}
