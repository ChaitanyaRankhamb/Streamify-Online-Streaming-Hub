import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/user";
import { handleOAuthLogin, handleOAuthSignup } from "@/lib/handlers";

connectDB();

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ githubId: profile.id }, { email: profile.email }],
      });

      if (account?.provider === "github") {
        if (existingUser) {
          // Login flow
          const loginResult = await handleOAuthLogin(profile);
          return loginResult.success;
        } else {
          // Signup flow
          const signupResult = await handleOAuthSignup(profile);
          return signupResult.success;
        }
      }

      return false; // Reject if provider is not github
    },
    async session({ session, token, user }: any) {
      // Attach MongoDB user ID and role to session
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.role = dbUser.role;
      }
      return session;
    },
  },
};

export const authHandler = (req: Request) => Auth(req, authOptions);
