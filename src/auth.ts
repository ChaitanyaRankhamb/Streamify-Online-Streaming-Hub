// auth.ts
import GitHub from "@auth/core/providers/github";
import { Auth } from "@auth/core";
import User from "../../Streamify - Online Streaming Hub/src/models/user";
import { connectDB } from "@/lib/mongoose";
import type { User as AuthUser, Account as AuthAccount, Profile as AuthProfile } from "@auth/core/types";

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthUser;
      account: AuthAccount;
      profile: AuthProfile;
    }) {
      await connectDB(); // connect to MongoDB before querying

      if (account.provider === "github") {
        let existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          existingUser = new User({
            username: profile.name || profile.login,
            email: profile.email,
            password: "", // no password for OAuth users
            role: "user",
          });
          await existingUser.save();
        }

        user.id = existingUser._id.toString();
        user.username = existingUser.username;
        user.email = existingUser.email;
      }

      return true;
    },

    async session({ session, user }) {
      session.user.id = user.id;
      session.user.email = user.email;
      session.user.name = user.username || user.name;
      session.user.image = user.image || user.avatar_url;
      return session;
    },
  },
};

export const handlers = Auth(authOptions);
