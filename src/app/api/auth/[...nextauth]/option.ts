import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import UserModel from "@/models/user";

interface MyAuthOptions {
  providers: any[];
  secret?: string;
  session?: any;
  callbacks?: any;
  // JWT is handled in callbacks.jwt, no separate key needed here
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "you@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        });

        console.log("user found:", user);
        
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        console.log("user login successful:", user.username);
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user, // spreads _id, avatar, idToken, isVerified, username, etc.
          idToken: token.user.idToken ?? null,
          isVerified: token.user.isVerified ?? false,
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      // When user signs in
      if (user) {
        token.user = {
          ...token.user, // preserve existing fields
          ...user, // add new fields
          _id: String(user._id),
          avatar:
            user.avatar ||
            (() => {
              const initials = user.username
                ? user.username.charAt(0).toUpperCase()
                : "U";
              const colors = ["FF5733", "33B5FF", "28A745", "FFC107", "6F42C1"];
              const randomColor =
                colors[Math.floor(Math.random() * colors.length)];
              return `https://ui-avatars.com/api/?name=${initials}&background=${randomColor}&color=fff`;
            })(),
          idToken: user.idToken ?? null,
          isVerified: user.isVerified ?? false,
        };
      }

      // Always return token (even on subsequent calls)
      return token;
    },
  },
};

export default authOptions;
