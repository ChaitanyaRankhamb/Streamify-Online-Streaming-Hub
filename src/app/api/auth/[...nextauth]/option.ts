import type { AuthConfig } from "@auth/core";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import NextAuth from "next-auth";

export const authOptions: AuthConfig = {
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // connect to db
        await connectDB();

        try {
          // find user by email or username
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // no user found
          if (!user) {
            throw new Error("No user found with this email/username.");
          }

          // check password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // invalid password
          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          // return user object if everything is fine
          console.log("user login successful:", user.username);
          return user;
        } catch (err: any) {
          throw err;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, token }) {
      if (token.user) {
        // replace default session.user with full user object
        session.user = {
          ...session.user, // keep default NextAuth fields like name, email, image
          ...token.user, // spread full user object
        };
        // Assign additional properties directly
        (session.user as any).id = token.id; // string _id
        (session.user as any).avatar = token.avatar; // generated avatar link
        (session.user as any).idToken = token.idToken; // optional token
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // store _id as string only (safe for JWT/session)
        token.id = String((user as any)._id);

        // store entire user object
        token.user = user as any;

        // generate avatar using first letter of username
        const initials = (user as any).username
          ? (user as any).username.charAt(0).toUpperCase()
          : "U";

        const colors = ["FF5733", "33B5FF", "28A745", "FFC107", "6F42C1"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // save avatar link
        token.avatar = `https://ui-avatars.com/api/?name=${initials}&background=${randomColor}&color=fff`;

        // optional idToken if you want
        token.idToken = (user as any).idToken || null;
      }

      return token;
    },
  },
};