// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "./option";

const handler = NextAuth(authOptions);

// export handler for both GET and POST
export { handler as GET, handler as POST };
