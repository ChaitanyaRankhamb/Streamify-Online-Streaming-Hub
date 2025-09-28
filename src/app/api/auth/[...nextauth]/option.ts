import type { AuthConfig } from "@auth/core";


import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/user"

export const authOptions: AuthConfig = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: any): Promise<any> {
        // first connect the database
        await connectDB();

        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.indentifier },
              { username: credentials.indentifier },
            ]
          });

          if (!user) {
            throw new Error("No user exist with this credentials.")
          }

          const isPasswordValid = await bcrypt.
            compare(credentials.password, user.password);

          if (!isPasswordValid) {
            // we can generate the jwt token here

            return user;
          } else {
            throw new Error("user credentails mismatched.")
          }

        } catch (err: any) {
          throw new Error(err);
        }
      },
    })
  ],


}