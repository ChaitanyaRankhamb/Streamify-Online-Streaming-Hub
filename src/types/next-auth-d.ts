import 'next-auth';
import { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    avatar?: string;
    idToken: string;
  }

  interface Session {
    user: {
      idToken?: string | null;
      isVerified: boolean;
      username?: string;
      avatar?: string;
    } & DefaultSession['user']; // merge with default session user properties
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
    avatar?: string;
    idToken: string;
    user?: User; // Full user object included in the JWT token
  }
}
